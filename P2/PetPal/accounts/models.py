from django.db import models
from django.contrib.contenttypes.fields import GenericRelation

# Create your models here.
class Seeker(models.Model):
    
    notifications = GenericRelation('Notification')


class Shelter(models.Model):

    notifications = GenericRelation('Notification')