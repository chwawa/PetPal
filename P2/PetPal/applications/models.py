from django.db import models
from pets.models import Pet
from accounts.models import CustomUser

# Create your models here.
class Application(models.Model):
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="applications_applicant")
    shelter = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="applications_shelter")
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    applicantOtherPetsDetails = models.TextField()
    applicantOtherPetsNeutered = models.BooleanField(default=False)
    applicantOutdoorArea = models.BooleanField(default=False)
    applicantAnimalAlone = models.BooleanField(default=False)
    applicantHistory = models.BooleanField(default=False)
    applicantProperty = models.TextField()
    applicantHome = models.TextField()
    applicantWork = models.TextField()
    applicantDetails = models.TextField()
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)

    STATUS_CHOICES = [
        ("PENDING", "PENDING"), ("ACCEPTED", "ACCEPTED"), ("DENIED", "DENIED"), ("WITHDRAWN", "WITHDRAWN"),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    creation_time  = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)