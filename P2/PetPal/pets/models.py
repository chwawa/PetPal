# models.py
from django.db import models
from accounts.models import CustomUser


class Pet(models.Model):
    SPECIES_CHOICES = [
        ("d", "Dog"), ("c", "Cat"), ("o", "Other"),
    ]
    STATUS_CHOICES = [
        ("a", "Available"), ("u", "Unavailable"),
    ]
    COLOUR_CHOICES = [
        ("w", "White"), ("br", "Brown"), ("be", "Beige"), ("g", "Grey"), ("bl", "Black"), ("o", "Other"),
    ]
    GENDER_CHOICES = [
        ("m", "Male"), ("f", "Female"),
    ]
    SIZE_CHOICES = [
        ("s", "Small (5-10kg)"), ("m", "Medium (10-15kg)"), ("l", "Large (15-30kg)"),
    ] 
    name = models.CharField(max_length=255)
    biography = models.TextField(blank=True)
    species = models.CharField(max_length=1, choices=SPECIES_CHOICES, default='d')
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='a')
    creation_time = models.DateTimeField(auto_now_add=True)
    breed = models.CharField(max_length=255)
    colour = models.CharField(max_length=2, choices=COLOUR_CHOICES, default='w')
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='m')
    size = models.CharField(max_length=1, choices=SIZE_CHOICES, default='s')
    location = models.CharField(max_length=255)
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


