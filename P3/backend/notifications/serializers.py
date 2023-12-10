from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    creation_time = serializers.DateTimeField(read_only=True, format="%m-%d %H:%M:%S")

    class Meta:
        model = Notification
        fields = '__all__'