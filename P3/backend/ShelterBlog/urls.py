from django.urls import path
from .views import ShelterBlogCreateView, ShelterBlogDetailView, ShelterBlogUpdateView, ShelterBlogListView

app_name='shelter'
urlpatterns = [
    path('<int:shelter_id>/blog/', ShelterBlogListView.as_view(), name='shelter-blog-list'),
    path('<int:shelter_id>/blog/create/', ShelterBlogCreateView.as_view(), name='shelter-blog-create'),
    path('<int:shelter_id>/blog/<int:shelterblog_id>/', ShelterBlogDetailView.as_view(), name='shelter-blog-detail'),
    path('<int:shelter_id>/blog/<int:shelterblog_id>/update/', ShelterBlogUpdateView.as_view(), name='shelter-blog-update'),
]