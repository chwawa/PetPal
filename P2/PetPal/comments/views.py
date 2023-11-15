from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import ShelterReviewComment, ApplicationComment
from .serializers import ShelterCommentSerializer, ApplicationCommentSerializer
from accounts.models import CustomUser
from rest_framework.exceptions import PermissionDenied
from applications.models import Application

class SetPaginationComments(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 10

class ShelterCommentListCreateAPIView(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SetPaginationComments

    def perform_create(self, serializer):
        serializer.save(commenter=self.request.user, 
                        shelter=CustomUser.objects.get(id=self.kwargs['pk'], user_type='shelter'))
    def get_queryset(self):
        return ShelterReviewComment.objects.filter(shelter=self.kwargs['pk']).order_by('-creation_time')

class ApplicationCommentListCreateAPIView(ListCreateAPIView):
    serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SetPaginationComments

    def perform_create(self, serializer):
        application = Application.objects.get(self.kwargs['pk'])
        if self.request.user == application.applicant or self.request.user == application.pet.shelter:
            serializer.save(commenter=self.request.user,
                            application=application)
        else:
            raise PermissionDenied("You do not have permission to perform this action.")
    def get_queryset(self):
        application = Application.objects.get(self.kwargs['pk'])
        if self.request.user == application.applicant or self.request.user == application.pet.shelter:
            return ApplicationComment.objects.filter(application=application).order_by('-creation_time')
        else:
            raise PermissionDenied("You do not have permission to perform this action.")