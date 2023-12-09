from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import CustomUser

class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and CustomUser.objects.get(id=request.user.id).user_type == 'shelter'
    

class IsSeeker(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and CustomUser.objects.get(id=request.user.id).user_type == 'seeker'