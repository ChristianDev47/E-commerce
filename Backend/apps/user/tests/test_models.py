from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.user.models import User, UserPhoneNumber, UserAddress, UserAccessToken

User = get_user_model()

class UserModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='Password12#',
            name='John',
            surname='Doe'
        )

    def test_user_creation(self):
        """Test creating a new user."""
        self.assertEqual(self.user.email, 'testuser@example.com')
        self.assertTrue(self.user.check_password('Password12#'))
        self.assertEqual(self.user.name, 'John')
        self.assertEqual(self.user.surname, 'Doe')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)

    def test_user_string_representation(self):
        """Test the string representation of the user."""
        self.assertEqual(str(self.user), 'testuser@example.com')

class UserPhoneNumberModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='Password12#',
            name='John',
            surname='Doe'
        )
        self.phone_number = UserPhoneNumber.objects.create(
            code='+1',
            phone_number=1234567890,
            user=self.user
        )

    def test_phone_number_creation(self):
        """Test creating a new phone number."""
        self.assertEqual(self.phone_number.code, '+1')
        self.assertEqual(self.phone_number.phone_number, 1234567890)
        self.assertEqual(self.phone_number.user, self.user)

    def test_phone_number_string_representation(self):
        """Test the string representation of the phone number."""
        self.assertEqual(str(self.phone_number), '+1 1234567890')

class UserAddressModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='Password12#',
            name='John',
            surname='Doe'
        )
        self.address = UserAddress.objects.create(
            country='USA',
            state='California',
            city='Los Angeles',
            street_address='123 Sunset Blvd',
            postal_code='90001',
            user=self.user
        )

    def test_address_creation(self):
        """Test creating a new address."""
        self.assertEqual(self.address.country, 'USA')
        self.assertEqual(self.address.state, 'California')
        self.assertEqual(self.address.city, 'Los Angeles')
        self.assertEqual(self.address.street_address, '123 Sunset Blvd')
        self.assertEqual(self.address.postal_code, '90001')
        self.assertEqual(self.address.user, self.user)

    def test_address_string_representation(self):
        """Test the string representation of the address."""
        self.assertEqual(
            str(self.address),
            'USA, Los Angeles, 123 Sunset Blvd, 90001'
        )

class UserAccessTokenModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email='testuser@example.com',
            password='Password12#',
            name='John',
            surname='Doe'
        )
        self.access_token = UserAccessToken.objects.create(
            access_token='abcd1234',
            refresh_token='efgh5678',
            user=self.user
        )

    def test_access_token_creation(self):
        """Test creating a new access token."""
        self.assertEqual(self.access_token.access_token, 'abcd1234')
        self.assertEqual(self.access_token.refresh_token, 'efgh5678')
        self.assertEqual(self.access_token.user, self.user)

    def test_access_token_string_representation(self):
        """Test the string representation of the access token."""
        self.assertEqual(str(self.access_token), 'abcd1234')
