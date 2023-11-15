from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Application


class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'


class ApplicationUpdateSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['status']
