from django.urls import path
from .views import ApplicationView, ApplicationDetailView, ApplicationUpdateView, ShelterApplicationsListView

app_name = 'applications'
urlpatterns = [
    path('pet/<int:pet_id>/', ApplicationView.as_view(), name='pet-application'),
    path('<int:application_id>/', ApplicationDetailView.as_view(), name='application-detail'),
    path('<int:application_id>/update/', ApplicationUpdateView.as_view(), name='application_update'),
    path('shelter/applications/', ShelterApplicationsListView.as_view(), name='shelter_applications'),
]