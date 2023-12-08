from rest_framework import serializers
from .models import ShelterReviewComment, ApplicationComment
class ShelterCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelterReviewComment
        fields = ['text', 'commenter', 'id']

class ApplicationCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = ['text']