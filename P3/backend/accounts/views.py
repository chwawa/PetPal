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
from rest_framework.pagination import PageNumberPagination

class ShelterListingPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100

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
                'refresh_token': refresh_token,
                'id': user.id,
                'usertype': user.user_type
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
        profile = get_object_or_404(CustomUser, id=self.kwargs['pk'])
        if profile.user_type == 'shelter':
            return profile
        else:
            if profile == self.request.user:
                return profile
            if self.request.user.user_type == "shelter":
                application = get_object_or_404(Application, applicant=profile)
                if application.pet.shelter == self.request.user and application.PENDING == True and application.ACCEPTED == False and application.DENIED == False and application.WITHDRAWN == False:
                    return profile
            raise PermissionDenied("You do not have permission to perform this action.", code=403)
        

class UserDetailViewComments(generics.RetrieveAPIView):
    serializer_class = UserDetailSerializer
    # permission_classes = [IsAuthenticated]
    def get_object(self):
        profile = get_object_or_404(CustomUser, id=self.kwargs['pk'])
        return profile
    

class ListView(generics.ListAPIView):
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ShelterListingPagination
    def get_queryset(self):
        if self.kwargs['type'] != 'shelters':
            raise PermissionDenied("Access is not allowed.")
        return CustomUser.objects.filter(user_type='shelter')

class DeleteView(generics.DestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()
    def perform_destroy(self, instance):
        if instance == self.request.user:
            if instance.user_type == 'shelter':
                instance.pets.all().delete()
            else:
                instance.applications_applicant.all().delete()
            instance.notifications.all().delete()
            instance.delete()
        else:
            raise PermissionDenied("You do not have permission to perform this action.")
