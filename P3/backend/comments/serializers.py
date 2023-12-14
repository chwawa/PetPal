from rest_framework import serializers
from .models import ShelterReviewComment, ApplicationComment, ShelterBlogComment
class ShelterCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelterReviewComment
        fields = ['text', 'commenter', 'rating']

class ApplicationCommentSerializer(serializers.ModelSerializer):
    creation_time = serializers.DateTimeField(read_only=True, format="%m-%d-%y %H:%M:%S")
    class Meta:
        model = ApplicationComment
        fields = ['text', 'commenter', 'creation_time']

class ShelterBlogCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelterBlogComment
        fields = ['text', 'commenter']