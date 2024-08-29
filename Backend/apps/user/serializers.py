from rest_framework import serializers
from .models import User, UserAddress, UserPhoneNumber, UserAccessToken
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import authenticate
from datetime import datetime
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class UserAccessTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccessToken
        fields = "__all__"
        
class UserAddressReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"

class UserPhoneNumberReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhoneNumber
        fields = "__all__"
        
class UserAddressWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = "__all__"


class UserPhoneNumberWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhoneNumber
        fields = "__all__"


class UserReadSerializer(serializers.ModelSerializer): 
    phone_numbers = UserPhoneNumberReadSerializer(many=True, read_only=True)
    addresses = UserAddressReadSerializer(many=True, read_only=True)
    access_tokens = UserAccessTokenSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'id', 'phone_numbers', 'addresses', 'access_tokens', 
            'password', 'email', 'name', 'surname', 'created_at', 'updated_at'
        ]
        depth = 1 


class UserWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "surname", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            surname=validated_data['surname'],
            password=validated_data['password']
        )
        self._create_or_update_access_token(user)
        return UserReadSerializer(user).data

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.surname = validated_data.get('surname', instance.surname)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.save()
        self._create_or_update_access_token(instance)
        return UserReadSerializer(instance).data
    
    def _create_or_update_access_token(self, user):
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        UserAccessToken.objects.update_or_create(
            user=user,
            defaults={
                'access_token': str(access_token),
                'refresh_token': str(refresh_token),
            }
        )

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                if user.is_active:
                    return {'user': user}
                else:
                    raise serializers.ValidationError("Cuenta inactiva")
            else:
                raise serializers.ValidationError("Datos incorrectos")
        else:
            raise serializers.ValidationError("Debe ingresar un email y contraseña")

    def create(self, validated_data):
        user = validated_data['user']
        self._create_or_update_access_token(user)
        return  UserReadSerializer(user).data,

    def _create_or_update_access_token(self, user):
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        UserAccessToken.objects.update_or_create(
            user=user,
            defaults={
                'access_token': str(access_token),
                'refresh_token': str(refresh_token),
            }
        )
        
class PasswordUpdateSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(write_only=True)
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def validate_user_id(self, value):
        try:
            user = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this ID does not exist.")
        self.user = user
        return value

    def validate_current_password(self, value):
        if not self.user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def save(self, **kwargs):
        new_password = self.validated_data['new_password']
        self.user.set_password(new_password)
        self.user.save()
        return self.user


class LogoutSerializer(serializers.Serializer):
    access = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['access']
        return attrs
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist() 
        except TokenError:
            self.fail('bad_token')