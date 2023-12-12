from .serializers import ApplicationSerializer
from django.shortcuts import get_object_or_404
from django.urls import reverse
from .models import Application
from .serializers import ApplicationUpdateSerializer
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsShelter, IsSeeker
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated,SAFE_METHODS
from pets.models import Pet
from notifications.models import Notification
from accounts.models import CustomUser
from django_filters.rest_framework import DjangoFilterBackend


# class ApplicationCreateView(CreateAPIView):
#     queryset = Application.objects.all()
#     serializer_class = ApplicationSerializer
#     permission_classes = [IsAuthenticated, IsSeeker]

#     def perform_create(self, serializer):
#         pet_id = self.request.data.get("pet")
#         new_app = serializer.save(applicant=self.request.user, shelter=Pet.objects.get(id=pet_id).shelter)

class ApplicationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ApplicationView(APIView):
    permission_classes = [IsAuthenticated, IsSeeker]

    def post(self, request, pet_id):
        pet = Pet.objects.get(pk=pet_id)
        if pet.status == 'u':
            return Response({'error': 'Pet is not available for adoption.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            new_app = serializer.save(pet=pet, applicant=request.user, shelter=pet.shelter)

            # Create notification for new application
            message = f"A new application for {pet.name} has been created by {request.user.name}."
            link = reverse("applications:application-detail", kwargs={'application_id': new_app.id})
            Notification(user=pet.shelter, message=message, link=link).save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ApplicationDetailView(APIView):
    permission_classes = [IsAuthenticated, IsShelter | IsSeeker]

    def get(self, request, application_id):
        application = get_object_or_404(Application, pk=application_id)
        serializer = ApplicationSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ApplicationUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsShelter | IsSeeker]

    def get_object(self, application_id):
        return get_object_or_404(Application, pk=application_id)

    def put(self, request, application_id):
        application = self.get_object(application_id)

        new_status = request.data.get('status')

        if (CustomUser.objects.get(id=request.user.id).user_type == 'shelter' and application.status == 'PENDING' and (new_status == 'ACCEPTED' or new_status == 'DENIED')) or (CustomUser.objects.get(id=request.user.id).user_type == 'seeker' and (application.status == 'PENDING' or application.status == 'ACCEPTED') and new_status == 'WITHDRAWN'):
            serializer = ApplicationUpdateSerializer(application, data=request.data)
            if serializer.is_valid():
                app = serializer.save()

                # Create notification for application update
                message = "An application's status has been updated."
                link = reverse("applications:application-detail", kwargs={'application_id': app.id})
                Notification(user=request.user, message=message, link=link).save()
                Notification(user=application.shelter, message=message, link=link).save()

                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)


class ApplicationsListView(ListAPIView):
    permission_classes = [IsSeeker | IsShelter]
    serializer_class = ApplicationSerializer
    pagination_class = ApplicationPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'shelter', 'pet', 'applicant']

    def get_queryset(self):
        user = CustomUser.objects.get(id=self.request.user.id)
        if user.user_type == 'seeker':
            applications = Application.objects.filter(applicant=user)

            ordering = self.request.query_params.get('sort', 'creation_time')
            if ordering:
                applications = applications.order_by(ordering)

            # return applications
            return Application.objects.all()
        else:
            applications = Application.objects.filter(shelter=user)

            ordering = self.request.query_params.get('sort', 'creation_time')
            if ordering:
                applications = applications.order_by(ordering)

            # return applications
            return Application.objects.all()

