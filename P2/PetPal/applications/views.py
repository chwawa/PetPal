from .serializers import ApplicationSerializer
from django.shortcuts import get_object_or_404
from .models import Application
from .serializers import ApplicationUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsShelter, IsSeeker
from rest_framework.pagination import PageNumberPagination
from pets.models import Pet


class ShelterApplicationsListView(APIView):
    permission_classes = [IsShelter]
    def get(self, request):
        status_filter = request.query_params.get('status', None)
        sort_by = request.query_params.get('sort_by', None)
        pagination = PageNumberPagination()
        applications = Application.objects.filter(pet_shelter=request.user.shelter)
        result_page = pagination.paginate_queryset(applications, request)
        if status_filter:
            result_page = result_page.filter(status=status_filter)
        if sort_by:
            if sort_by == 'creation time':
                result_page = sorted(result_page, key=lambda x: x.creation_time)
            elif sort_by == 'last update time':
                result_page = sorted(result_page, key=lambda x: x.update_time, reverse=True)
        serializer = ApplicationSerializer(result_page, many=True)
        return pagination.get_paginated_response(serializer.data)

class ApplicationView(APIView):
    permission_classes = [IsSeeker]

    def post(self, request, pet_id):
        pet = Pet.objects.get(pk=pet_id)
        if pet.status == 'u':
            return Response({'error': 'Pet is not available for adoption.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(pet=pet, applicant=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApplicationUpdateView(APIView):
    permission_classes = [IsShelter | IsSeeker]

    def get_object(self, application_id):
        return get_object_or_404(Application, pk=application_id)

    def put(self, request, application_id):
        application = self.get_object(application_id)
        if (request.user.user_type == 'shelter' and application.PENDING) or (request.user.user_type == 'seeker' and application.PENDING or application.ACCEPTED):
            serializer = ApplicationUpdateSerializer(application, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)


class ApplicationDetailView(APIView):
    permission_classes = [IsShelter | IsSeeker]

    def get(self, request, application_id):
        application = get_object_or_404(Application, pk=application_id, applicant=request.user)
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)
