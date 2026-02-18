from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserViewSet,
    ResourceViewSet,
    BookingViewSet,
    UserActivityViewSet,
    UserActivityViewSet,
    CustomTokenObtainPairView,
    LogoutView
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'resources', ResourceViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'user-activity', UserActivityViewSet, basename='user-activity')

urlpatterns = [
    # API endpoints for CRUD operations
    path('', include(router.urls)),
    
    # Authentication endpoints
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
