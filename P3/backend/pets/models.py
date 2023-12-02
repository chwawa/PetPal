from django.db import models
from accounts.models import CustomUser


class Pet(models.Model):
    SPECIES_CHOICES = [
        ("dog", "Dog"), ("cat", "Cat"), ("other", "Other"),
    ]
    STATUS_CHOICES = [
        ("available", "Available"), ("unavailable", "Unavailable"),
    ]
    COLOUR_CHOICES = [
        ("white", "White"), ("brown", "Brown"), ("beige", "Beige"), ("grey", "Grey"), ("black", "Black"), ("other", "Other"),
    ]
    GENDER_CHOICES = [
        ("male", "Male"), ("female", "Female"),
    ]
    SIZE_CHOICES = [
        ("small", "Small (5-10kg)"), ("medium", "Medium (10-15kg)"), ("large", "Large (15-30kg)"),
    ] 
    name = models.CharField(max_length=255)
    picture = models.ImageField(upload_to='./P2/PetPal/pets/pictures/', null=True, blank=True)
    biography = models.TextField(blank=True)
    species = models.CharField(max_length=5, choices=SPECIES_CHOICES, default='dog')
    status = models.CharField(max_length=11, choices=STATUS_CHOICES, default='available')
    creation_time = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    breed = models.CharField(max_length=255)
    colour = models.CharField(max_length=5, choices=COLOUR_CHOICES, default='white')
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, default='male')
    size = models.CharField(max_length=6, choices=SIZE_CHOICES, default='small')
    location = models.CharField(max_length=255)
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="pets")

