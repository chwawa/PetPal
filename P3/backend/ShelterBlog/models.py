from django.db import models
from accounts.models import CustomUser

class ShelterBlog(models.Model):
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='shelter_blogs')
    content = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(CustomUser, related_name='liked_shelter_blogs')

