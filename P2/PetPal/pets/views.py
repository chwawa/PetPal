from django.shortcuts import render
from rest_framework import generics
from .models import Pet
from .serializers import PetSerializer
from .filters import PetFilter
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated,SAFE_METHODS
from .permissions import IsShelterUser
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from notifications.models import Notification
from django.urls import reverse
from accounts.models import CustomUser

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
    filter_class = PetFilter
    serializer_class = PetSerializer
    pagination_class = PetPagination

    def get_queryset(self):
        sort = self.request.query_params.get('sort', 'name')
        queryset = Pet.objects.all().order_by(sort)
        return queryset

class PetListSearch(ListAPIView):
    queryset = Pet.objects.all()
    filter_class = PetFilter
    serializer_class = PetSerializer
    

    def get_queryset(self):
        sort = self.request.query_params.get('sort', 'id')
        name = self.request.query_params.get('name')
        shelter_vals = self.request.query_params.get('shelter')
        status_vals = self.request.query_params.get('status')
        colour_vals = self.request.query_params.get('colour')
        size_vals = self.request.query_params.get('size')
        queryset = Pet.objects.all().order_by(sort)
        if not status_vals:
            status_vals = 'a'  
            queryset = queryset.filter(status=status_vals)
        else:
            statuses = status_vals
            query_filter = Q()
            for status in statuses:
                query_filter |= Q(status=status)
            queryset = queryset.filter(query_filter)
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        if shelter_vals:
            shelters = shelter_vals
            query_filter = Q()
            for shelter in shelters:
                query_filter |= Q(shelter=shelter)
            queryset = queryset.filter(query_filter)
        if colour_vals:
            colours = colour_vals
            query_filter = Q()
            for colour in colours:
                query_filter |= Q(colour=colour)
            queryset = queryset.filter(query_filter)
        if size_vals:
            sizes =size_vals
            query_filter = Q()
            for size in sizes:
                query_filter |= Q(size=size)
            queryset = queryset.filter(query_filter)
        return queryset
    