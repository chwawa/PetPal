from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .serializers import LoginSerializer, UserSerializer, UserDetailSerializer, UserUpdateSerializer
from django.contrib.auth import login
from .models import CustomUser
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from applications.models import Application

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
        profile = get_object_or_404(CustomUser, id=self.kwargs['pk'])
        if profile.user_type == 'shelter':
            return profile
        else:
            application = Application.objects.get(applicant=profile)
            if (application.pet.shelter == self.request.user and application.PENDING == True) or (profile == self.request.user):
                return profile
            else:
                raise PermissionDenied("You do not have permission to perform this action.")
        
class ListView(generics.ListAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        if self.kwargs['type'] != 'shelters':
            raise PermissionDenied("Access is not allowed.")
        return CustomUser.objects.filter(user_type='shelter')

class DeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def perform_destroy(self, instance):
        if instance.user_type == 'shelter':
            instance.Pet_set.all().delete()
        else:
            instance.Application_set.all().delete()
        instance.Notification_set.all().delete()
        instance.delete()
