from rest_framework import serializers
from .models import ShelterReviewComment, ApplicationComment, ShelterBlogComment
class ShelterCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelterReviewComment
        fields = ['text', 'commenter', 'rating']

class ApplicationCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ['text']

class ShelterBlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelterBlogComment
        fields = ['text', 'commenter']