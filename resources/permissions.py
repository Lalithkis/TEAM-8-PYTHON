from rest_framework import permissions

class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow staff to edit objects.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the staff user.
        return request.user and request.user.is_authenticated and request.user.role == 'STAFF'

class IsOwnerOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or staff to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Staff can do anything
        if request.user.role == 'STAFF':
            return True

        # Owners can only view their own bookings? Or edit them?
        # Requirement: "STUDENT: Can create booking, Can view bookings"
        # Usually they should not edit approved bookings.
        return obj.user == request.user
