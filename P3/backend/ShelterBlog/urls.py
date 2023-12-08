from django.urls import path
from .views import ShelterBlogCreateView, ShelterBlogRetrieveUpdateDestroyView, ShelterBlogListView

app_name='shelterblog'
urlpatterns = [
    path('', ShelterBlogListView.as_view(), name='shelter-blog-list'),
    path('create/', ShelterBlogCreateView.as_view(), name='shelter-blog-create'),
    path('<int:pk>/', ShelterBlogRetrieveUpdateDestroyView.as_view(), name='shelter-blog-detail'),
]