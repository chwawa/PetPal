from django.urls import path
from .views import LoginView, UserCreateView, UserUpdateView, UserDetailView, ListView, DeleteView, UserDetailViewComments, ListViewAll
 
app_name='accounts'
urlpatterns = [
    path('', LoginView.as_view(), name='login'),
    path('user/creation/', UserCreateView.as_view(), name='user-create'),
    path('user/<int:pk>/updation/', UserUpdateView.as_view(), name='user-update'),
    path('user/<int:pk>/profile/', UserDetailView.as_view(), name='user-detail'),
    path('list/<str:type>/', ListView.as_view(), name='list'),
    path('all/', ListViewAll.as_view(), name='list-all-seekers'),
    path('user/<int:pk>/deletion/', DeleteView.as_view(), name='delete'),
    path('user/<int:pk>/', UserDetailViewComments.as_view(), name='user-detail-comments'),
]