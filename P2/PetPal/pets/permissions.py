from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import CustomUser

class IsShelterUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and CustomUser.objects.get(id=request.user.id).user_type == 'shelter'

    def has_object_permission(self, request, view, obj):
        # Check if the shelter user's ID corresponds to the "shelter" field of the pet
        return request.user.is_authenticated and obj.shelter.id == request.user.id