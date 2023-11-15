from django.urls import path
from .views import ShelterCommentListCreateAPIView, ApplicationCommentListCreateAPIView

app_name='comments'
urlpatterns = [
    path('shelter/<int:pk>/', ShelterCommentListCreateAPIView.as_view(), name='shelter-comment-list-create'),
    path('application/<int:pk>/', ApplicationCommentListCreateAPIView.as_view(), name='application-comment-list-create'),
]