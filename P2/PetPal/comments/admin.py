from django.contrib import admin
from .models import ShelterReviewComment, ApplicationComment

admin.site.register(ShelterReviewComment, ApplicationComment)
