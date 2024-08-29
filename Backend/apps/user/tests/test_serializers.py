from django.test import TestCase
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from apps.user.models import User, UserAddress, UserPhoneNumber, UserAccessToken
from apps.user.serializers import (
    UserAccessTokenSerializer,
    UserAddressReadSerializer,
    UserPhoneNumberReadSerializer,
    UserAddressWriteSerializer,
    UserPhoneNumberWriteSerializer,
    UserReadSerializer,
    UserWriteSerializer,
    LoginSerializer,
    PasswordUpdateSerializer,
    LogoutSerializer
)

class UserSerializerTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='Password12#',
            name='John',
            surname='Doe'
        )
        self.user_address = UserAddress.objects.create(
            country='USA',
            state='California',
            city='Los Angeles',
            street_address='123 Sunset Blvd',
            postal_code='90001',
            user=self.user
        )
        self.user_phone_number = UserPhoneNumber.objects.create(
            code='+1',
            phone_number=1234567890,
            user=self.user
        )
        self.user_access_token = UserAccessToken.objects.create(
            access_token='abcd1234',
            refresh_token='efgh5678',
            user=self.user
        )

    def test_user_read_serializer(self):
        """Test the UserReadSerializer."""
        serializer = UserReadSerializer(instance=self.user)
        data = serializer.data
        self.assertEqual(data['email'], 'testuser@example.com')
        self.assertEqual(data['name'], 'John')
        self.assertEqual(data['surname'], 'Doe')
        self.assertEqual(data['phone_numbers'][0]['code'], '+1')
        self.assertEqual(data['addresses'][0]['country'], 'USA')
        self.assertEqual(data['access_tokens'][0]['access_token'], 'abcd1234')

    def test_user_write_serializer_create(self):
        """Test creating a user using UserWriteSerializer."""
        data = {
            'email': 'newuser@example.com',
            'password': 'NewPassword12#',
            'name': 'Jane',
            'surname': 'Smith'
        }
        serializer = UserWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user['email'], 'newuser@example.com')
        self.assertTrue(User.objects.filter(email='newuser@example.com').exists())

    def test_user_write_serializer_update(self):
        """Test updating a user using UserWriteSerializer."""
        data = {
            'email': 'updateduser@example.com',
            'name': 'Updated',
            'surname': 'User',
            'password': 'UpdatedPassword12#'
        }
        serializer = UserWriteSerializer(instance=self.user, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        updated_user = serializer.save()
        self.assertEqual(updated_user['email'], 'updateduser@example.com')
        self.assertTrue(User.objects.filter(email='updateduser@example.com').exists())

    def test_login_serializer(self):
        """Test the LoginSerializer."""
        data = {
            'email': 'testuser@example.com',
            'password': 'Password12#'
        }
        serializer = LoginSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        response_data = serializer.save()
        self.assertEqual(response_data[0]['email'], 'testuser@example.com')

    def test_password_update_serializer(self):
        """Test the PasswordUpdateSerializer."""
        data = {
            'user_id': self.user.id,
            'current_password': 'Password12#',
            'new_password': 'NewPassword12#'
        }
        serializer = PasswordUpdateSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertTrue(user.check_password('NewPassword12#'))

    def test_logout_serializer(self):
        """Test the LogoutSerializer."""
        refresh_token = RefreshToken.for_user(self.user)
        data = {'access': str(refresh_token)}
        serializer = LogoutSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        serializer.save()

    def test_user_access_token_serializer(self):
        """Test the UserAccessTokenSerializer."""
        serializer = UserAccessTokenSerializer(instance=self.user_access_token)
        data = serializer.data
        self.assertEqual(data['access_token'], 'abcd1234')
        self.assertEqual(data['refresh_token'], 'efgh5678')

    def test_user_address_read_serializer(self):
        """Test the UserAddressReadSerializer."""
        serializer = UserAddressReadSerializer(instance=self.user_address)
        data = serializer.data
        self.assertEqual(data['country'], 'USA')
        self.assertEqual(data['state'], 'California')
        self.assertEqual(data['city'], 'Los Angeles')
        self.assertEqual(data['street_address'], '123 Sunset Blvd')
        self.assertEqual(data['postal_code'], '90001')

    def test_user_phone_number_read_serializer(self):
        """Test the UserPhoneNumberReadSerializer."""
        serializer = UserPhoneNumberReadSerializer(instance=self.user_phone_number)
        data = serializer.data
        self.assertEqual(data['code'], '+1')
        self.assertEqual(data['phone_number'], 1234567890)

    def test_user_address_write_serializer(self):
        """Test creating a UserAddress using UserAddressWriteSerializer."""
        data = {
            'country': 'Canada',
            'state': 'Ontario',
            'city': 'Toronto',
            'street_address': '456 Maple Ave',
            'postal_code': 'M5A 1A1',
            'user': self.user.id
        }
        serializer = UserAddressWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        address = serializer.save()
        self.assertEqual(address.country, 'Canada')
        self.assertTrue(UserAddress.objects.filter(street_address='456 Maple Ave').exists())

    def test_user_phone_number_write_serializer(self):
        """Test creating a UserPhoneNumber using UserPhoneNumberWriteSerializer."""
        data = {
            'code': '+44',
            'phone_number': '98765432',  
            'user': self.user.id
        }
        serializer = UserPhoneNumberWriteSerializer(data=data)
        self.assertTrue(serializer.is_valid()) 
