from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate
from django.core.validators import validate_email

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, 
                            password=password)
        if not user: 
            raise serializers.ValidationError('Incorrect username or password')
        data['user'] = user
        return data

class UserSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = CustomUser
        fields = ['user_type', 'username', 'password', 'repeat_password', 'name', 'profile_pic', 'email', 'phone', 'location', 'about', 'new_pet_listing_pref']
    def validate(self, data):
        pwd1 = data.get('password')
        pwd2 = data.get('repeat_password')
        if pwd1 and len(pwd1) < 8:
            raise serializers.ValidationError('Password must have at least 8 characters')
        
        if pwd1 and pwd2 and pwd1 != pwd2:
            raise serializers.ValidationError('Passwords must match')
        
        email = data.get('email')
        if email:
            try:
                validate_email(email)
            except:
                raise serializers.ValidationError('Invalid email address')
        data.pop('repeat_password')
        return data

class UserUpdateSerializer(serializers.ModelSerializer):
    repeat_password = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(required=False)
    username = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'repeat_password', 'name', 'profile_pic', 'email', 'phone', 'location', 'about', 'new_pet_listing_pref']
    
    def validate(self, data):
        pwd1 = data.get('password')
        pwd2 = data.get('repeat_password')
        email = data.get('email')
        username = data.get('username')
        name = data.get('name')

        if pwd1 == None:
            data['password'] = self.instance.password
        if username == None:
            data['username'] = self.instance.username
        if name == None:
            data['name'] = self.instance.name
        if email == None:
            data['email'] = self.instance.email
        if pwd1 and len(pwd1) < 8:
            raise serializers.ValidationError('Password must have at least 8 characters')
        if pwd1 and pwd2 and pwd1 != pwd2:
            raise serializers.ValidationError('Passwords must match')

        if email:
            try:
                validate_email(email)
            except serializers.ValidationError:
                raise serializers.ValidationError('Invalid email address')

        data.pop('repeat_password', None)
        return data
    
    def get_initial(self):
        initial = super().get_initial()
        user = self.instance
        initial['username'] = user.username
        initial['name'] = user.name
        initial['email'] = user.email
        initial['phone'] = user.phone
        initial['location'] = user.location
        initial['about'] = user.about
        return initial

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'profile_pic', 'email', 'phone', 'location', 'about', 'new_pet_listing_pref' ]