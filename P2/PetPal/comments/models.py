from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from accounts.models import CustomUser
from applications.models import Application

class ShelterReviewComment(models.Model):
    commenter = models.ForeignKey(CustomUser,on_delete=models.SET_NULL, null=True, related_name='comments')
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)

class ApplicationComment(models.Model):
    commenter = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="comments")
    application = models.ForeignKey(Application,on_delete=models.CASCADE)
    text = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)