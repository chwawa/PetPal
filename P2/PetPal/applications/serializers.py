from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class ApplicationUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']

    def validate_status(self, value):
        user_shelter = self.context['request'].user.user_type == 'shelter'
        curr_status = self.instance.status if self.instance else None
        if user_shelter:
            if value not in [Application.ACCEPTED, Application.DENIED] and curr_status == Application.PENDING:
                raise serializers.ValidationError('Invalid status, shelter')
        else:
            if value != Application.WITHDRAWN and curr_status in [Application.PENDING, Application.ACCEPTED]:
                raise serializers.ValidationError('Invalid status, seeker')
        return value