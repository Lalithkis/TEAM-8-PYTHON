from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User, Resource, Booking
from .serializers import UserSerializer, ResourceSerializer, BookingSerializer, BookingStatusSerializer, CustomTokenObtainPairSerializer
from .permissions import IsStaffOrReadOnly, IsOwnerOrStaff

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        # Allow signup to anyone
        if self.action == 'create':
            return [permissions.AllowAny()]
        # Staff can list all users
        if self.action == 'list':
            return [permissions.IsAdminUser()] # Or IsStaffOrReadOnly but we defined permissions.IsAdminUser checks is_staff usually
        # Users can view/edit their own profile
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        # Admins see all users, regular users see themselves
        if self.request.user.is_staff or self.request.user.role == 'STAFF':
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsStaffOrReadOnly]

    def perform_create(self, serializer):
        # Ensure only staff creates resources
        if self.request.user.role != 'STAFF':
            raise permissions.PermissionDenied("Only staff can create resources.")
        serializer.save()

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrStaff]

    def get_queryset(self):
        # Allow all authenticated users to see all bookings
        # This is necessary so Students can see if a resource is 'Booked' by others (Availability Check)
        return Booking.objects.all()

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the booking
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        """
        Custom endpoint to update booking status.
        Only STAFF/ADMIN can approve or reject.
        """
        if request.user.role != 'STAFF':
            return Response({"detail": "Only staff can update booking status."}, status=status.HTTP_403_FORBIDDEN)
        
        booking = self.get_object()
        serializer = BookingStatusSerializer(booking, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
