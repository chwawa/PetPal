from django.shortcuts import render
from rest_framework import generics
from .models import ShelterBlog
from django.shortcuts import get_object_or_404
from .serializers import ShelterBlogSerializer
from rest_framework.permissions import IsAuthenticated,SAFE_METHODS
from .permissions import IsShelter, IsSeeker
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from notifications.models import Notification
from django.urls import reverse
from accounts.models import CustomUser
from shelter.models import Shelter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView


class ShelterBlogPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 100


class ShelterBlogCreateView(APIView):
    permission_classes = [IsAuthenticated, IsShelter]

    def post(self, request, shelter_id):
        shelter = Shelter.objects.get(pk=shelter_id)
        serializer = ShelterBlogSerializer(data=request.data)
        if serializer.is_valid():
            new_shelter_blog = serializer.save(shelter=shelter)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShelterBlogDetailView(APIView):
    permission_classes = [IsAuthenticated, IsShelter | IsSeeker]

    def get(self, request, shelter_id, shelterblog_id):
        shelterblog = get_object_or_404(ShelterBlog, pk=shelterblog_id)
        serializer = ShelterBlogSerializer(shelterblog)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ShelterBlogUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsShelter]

    def get_object(self, shelterblog_id):
        return get_object_or_404(ShelterBlog, pk=shelterblog_id)

    def put(self, request, shelterblog_id):
        shelterblog = self.get_object(shelterblog_id)
        if (CustomUser.objects.get(id=request.user.id).user_type == 'shelter'):
            serializer = ShelterBlogSerializer(shelterblog, data=request.data)
            if serializer.is_valid():
                sb = serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)


class ShelterBlogListView(ListAPIView):
    permission_classes = [IsAuthenticated, IsShelter | IsSeeker]
    serializer_class = ShelterBlogSerializer
    pagination_class =ShelterBlogPagination

    def get_queryset(self, shelter_id):
        shelterblogs = ShelterBlog.objects.filter(shelter=shelter_id)
        ordering = self.request.query_params.get('sort', 'creation_time')
        if ordering:
            shelterblogs = shelterblogs.order_by(ordering)

        return shelterblogs