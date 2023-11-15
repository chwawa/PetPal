from django.db import models
from accounts.models import CustomUser


# Create your models here.
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    creation_time = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    message = models.TextField()
    link = models.URLField(blank=True, null=True)
