from django.urls import path
from .views import ShelterCommentListCreateAPIView, ApplicationCommentListCreateAPIView, ShelterBlogCommentListCreateAPIView

app_name='comments'
urlpatterns = [
    path('shelter/<int:pk>/', ShelterCommentListCreateAPIView.as_view(), name='shelter-comment-list-create'),
    path('application/<int:pk>/', ApplicationCommentListCreateAPIView.as_view(), name='application-comment-list-create'),
    path('shelter/<int:pk>/blog/', ShelterBlogCommentListCreateAPIView.as_view(), name='shelter-blog-comment-list-create'),
]