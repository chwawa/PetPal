from django.shortcuts import render
from rest_framework import generics
from .models import Pet
from .serializers import PetSerializer
from rest_framework.permissions import IsAuthenticated,SAFE_METHODS
from .permissions import IsShelterUser
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from notifications.models import Notification
from django.urls import reverse
from accounts.models import CustomUser
from django_filters.rest_framework import DjangoFilterBackend


class PetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class PetCreateView(CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated, IsShelterUser]

    def perform_create(self, serializer):
        new_pet = serializer.save(shelter=self.request.user)

        # Create notification for new pet listing if user has preferences on
        message = f"{self.request.user} created a new pet listing."
        link = reverse("pets:pet-detail", kwargs={'pk':new_pet.id})
        seekers = CustomUser.objects.all().filter(user_type='seeker', new_pet_listing_pref='yes')
        for s in seekers:
            Notification(user=s, message=message, link=link).save()
  
        
class PetRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return []
        else:
            return [IsAuthenticated(), IsShelterUser()]


class PetListView(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    pagination_class = PetPagination

    #filter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['shelter', 'status', 'colour', 'size', 'breed', 'species']

    #sorts by any param
    def get_queryset(self):
        sort = self.request.query_params.get('sort', 'shelter')
        queryset = Pet.objects.all().order_by(sort)
        return queryset
