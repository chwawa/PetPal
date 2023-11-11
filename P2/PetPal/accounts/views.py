from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .serializers import LoginSerializer, UserSerializer, UserDetailSerializer, UserUpdateSerializer
from django.contrib.auth import login
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.urls import reverse_lazy
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

class LoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('user')
            login(request, user)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            return Response({
                'access_token': access_token,
                'refresh_token': refresh_token
            })
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        CustomUser.objects.create_user(**validated_data)

class UserUpdateView(generics.UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        user = get_object_or_404(CustomUser, id=self.kwargs['pk'])
        if user != self.request.user:
            raise PermissionDenied("You do not have permission to perform this action.")
        return user
    
class UserDetailView(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self):
        # need to add more conditions here once application is done
        return get_object_or_404(CustomUser, id=self.kwargs['pk'])
        
class ListView(generics.ListAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        if self.kwargs['type'] != 'shelters':
            raise PermissionDenied("Access is not allowed.")
        return CustomUser.objects.filter(user_type='shelter')

#need pet_listings, applications and notifications to test
class DeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def perform_destroy(self, instance):
        if instance.user_type == 'shelter':
            instance.pet_listings.all().delete()
        else:
            instance.applications.all().delete()
        instance.notifications.all().delete()
