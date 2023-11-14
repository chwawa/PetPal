from django.urls import path
from .views import PetCreateView, PetRetrieveUpdateDestroyView, PetListView, PetListSearch

app_name='pets'
urlpatterns = [
    path('', PetListSearch.as_view(), name='pet-list'),
    path('create/', PetCreateView.as_view(), name='pet-create'),
    path('<int:pk>/', PetRetrieveUpdateDestroyView.as_view(), name='pet-detail'),
]