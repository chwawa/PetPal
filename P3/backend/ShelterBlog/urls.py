from django.urls import path
from .views import ShelterBlogCreateView, ShelterBlogRetrieveUpdateDestroyView, ShelterBlogListView

app_name='shelter'
urlpatterns = [
    path('<int:shelter_id>/blog/', ShelterBlogListView.as_view(), name='shelter-blog-list'),
    path('<int:shelter_id>/blog/create/', ShelterBlogCreateView.as_view(), name='shelter-blog-create'),
    path('<int:shelter_id>/blog/<int:shelterblog_id>/', ShelterBlogRetrieveUpdateDestroyView.as_view(), name='shelter-blog-detail'),
]