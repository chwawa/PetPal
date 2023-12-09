from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import ShelterReviewComment, ApplicationComment, ShelterBlogComment
from .serializers import ShelterCommentSerializer, ApplicationCommentSerializer, ShelterBlogCommentSerializer
from accounts.models import CustomUser
from rest_framework.exceptions import PermissionDenied
from applications.models import Application
from notifications.models import Notification
from django.urls import reverse
from ShelterBlog.models import ShelterBlog

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
        
        # Create notification for new shelter review
        message = "You received a review."
        link = reverse("comments:shelter-comment-list-create", kwargs={'pk': self.kwargs['pk']}) # Takes you to list of shelter's reviews
        Notification(user=CustomUser.objects.get(id=self.kwargs['pk']), message=message, link=link).save()
        
    def get_queryset(self):
        return ShelterReviewComment.objects.filter(shelter=self.kwargs['pk']).order_by('-creation_time')
    
class ShelterBlogCommentListCreateAPIView(ListCreateAPIView):
    serializer_class = ShelterBlogCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SetPaginationComments

    def perform_create(self, serializer):
        serializer.save(commenter=self.request.user, 
                        blog=ShelterBlog.objects.get(id=self.kwargs['pk']))
        
    def get_queryset(self):
        return ShelterBlogComment.objects.filter(blog=self.kwargs['pk']).order_by('creation_time')

class ApplicationCommentListCreateAPIView(ListCreateAPIView):
    serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = SetPaginationComments

    def perform_create(self, serializer):
        application = Application.objects.get(id=self.kwargs['pk'])
        if self.request.user == application.applicant or self.request.user == application.pet.shelter:
            serializer.save(commenter=self.request.user,
                            application=application)
            
            if self.request.user == application.applicant:
                # Create notification for seeker for new message
                message = f"You received a message from {application.shelter} about {application.pet.name}."
                link = reverse("comments:application-comment-list-create", kwargs={'pk': application.id}) # Takes you to list of app's comments/chat
                Notification(user=self.request.user.name, message=message, link=link).save()
            else:
                # Create notification for shelter for new message
                message = f"You received a message from {self.request.user.name} about {application.pet.name}."
                link = reverse("comments:application-comment-list-create", kwargs={'pk': application.id})
                Notification(user=application.shelter, message=message, link=link).save()

        else:
            raise PermissionDenied("You do not have permission to perform this action.")
        
    def get_queryset(self):
        application = Application.objects.get(id=self.kwargs['pk'])
        if self.request.user == application.applicant or self.request.user == application.pet.shelter:
            return ApplicationComment.objects.filter(application=application).order_by('-creation_time')
        else:
            raise PermissionDenied("You do not have permission to perform this action.")
        
