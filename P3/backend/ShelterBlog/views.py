from django.shortcuts import render
from rest_framework import generics
from .models import ShelterBlog
from .serializers import ShelterBlogSerializer
from rest_framework.permissions import IsAuthenticated,SAFE_METHODS
from .permissions import IsShelterUser
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from notifications.models import Notification
from django.urls import reverse
from accounts.models import CustomUser
from django_filters.rest_framework import DjangoFilterBackend


class ShelterBlogPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100


class ShelterBlogCreateView(CreateAPIView):
    queryset = ShelterBlog.objects.all()
    serializer_class = ShelterBlogSerializer
    permission_classes = [IsAuthenticated, IsShelterUser]

    def perform_create(self, serializer):
        new_shelter_blog = serializer.save(shelter=self.request.user)
  
        
class ShelterBlogRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = ShelterBlog.objects.all()
    serializer_class = ShelterBlogSerializer

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return []
        else:
            return [IsAuthenticated(), IsShelterUser()]
        

class ShelterBlogListView(ListAPIView):
    queryset = ShelterBlog.objects.all()
    serializer_class = ShelterBlogSerializer
    pagination_class = ShelterBlogPagination

    #filter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['shelter']

    #sorts by any param
    def get_queryset(self):
        sort = self.request.query_params.get('sort', 'shelter')
        queryset = ShelterBlog.objects.all().order_by(sort)
        return queryset
