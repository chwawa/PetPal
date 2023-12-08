from django.contrib import admin
from .models import ShelterReviewComment, ApplicationComment, ShelterBlogComment

admin.site.register(ShelterReviewComment)
admin.site.register(ApplicationComment)
admin.site.register(ShelterBlogComment)