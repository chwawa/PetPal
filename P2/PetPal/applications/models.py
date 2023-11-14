from django.db import models
from pets.models import Pet
from accounts.models import CustomUser

# Create your models here.
class Application(models.Model):
    applicant = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    # dob = models.DateField(default="2006-10-25")
    email = models.EmailField()
    address = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    # occupation = models.CharField(max_length=255, default="na")
    # hours_away_weekdays = models.CharField(max_length=255, default="na")
    # hours_away_weekends = models.CharField(max_length=255, default="na")
    # health = models.CharField(max_length=255, default="na")
    # criminal_history = models.CharField(max_length=255, default="na")
    # previous_pet = models.BooleanField(default=False)
    # description = models.CharField(max_length=255, default="na")
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
    PENDING = models.BooleanField(default=True)
    ACCEPTED = models.BooleanField(default=False)
    DENIED = models.BooleanField(default=False)
    WITHDRAWN = models.BooleanField(default=False)
    creation_time  = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)