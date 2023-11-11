from django.urls import path
from . import views

app_name="notifications"

urlpatterns = [
    path('', views.ListCreateNotification.as_view()),
    path('<int:pk>/', views.RetrieveDestroyNotification.as_view()),
]