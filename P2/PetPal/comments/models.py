from django.db import models
from accounts.models import CustomUser
from applications.models import Application

class ShelterReviewComment(models.Model):
    commenter = models.ForeignKey(CustomUser,on_delete=models.SET_NULL, null=True, related_name='shelter_comments')
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='shelter_reviews')
    text = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)

class ApplicationComment(models.Model):
    commenter = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name="app_comments")
    application = models.ForeignKey(Application,on_delete=models.CASCADE, related_name="app_follow_ups")
    text = models.TextField()
    creation_time = models.DateTimeField(auto_now_add=True)