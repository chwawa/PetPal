from django.db import models
# from accounts.models import Seeker, Shelter
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


# Create your models here.
class Notification(models.Model):
    creation_time = models.DateTimeField()
    is_read = models.BooleanField(default=False)
    message = models.TextField()
    link = models.URLField(blank=True, null=True)

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

# class SeekerNotification(models.Model):
#     creation_time = models.DateTimeField()
#     is_read = models.BooleanField(default=False)
#     seeker = models.ForeignKey(User, on_delete=models.CASCADE)
#     message = models.TextField()
#     link = models.URLField(blank=True, null=True)

# class ShelterNotification(models.Model):
#     creation_time = models.DateTimeField()
#     is_read = models.BooleanField(default=False)
#     shelter = models.ForeignKey(User, on_delete=models.CASCADE)
#     message = models.TextField()
#     link = models.URLField(blank=True, null=True)
