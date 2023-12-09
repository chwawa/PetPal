from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length=255)
    profile_pic = models.FileField(upload_to='P3/backend/media/', null=True, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    about = models.TextField(null=True, blank=True)

    NEW_PET_LISTING_PREF = [
        ('yes', 'Yes'),
        ('no', 'No'),
    ]
    new_pet_listing_pref = models.CharField(max_length=3, choices=NEW_PET_LISTING_PREF, default='yes')

    USER_TYPE_CHOICES = [
        ('seeker', 'Seeker'),
        ('shelter', 'Shelter'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )
    def __str__(self) -> str:
        return str(self.id) + ' ' + self.name