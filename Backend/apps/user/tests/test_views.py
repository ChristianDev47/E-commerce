from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.user.models import User, UserAddress, UserPhoneNumber
from rest_framework_simplejwt.tokens import RefreshToken

UserModel = get_user_model()

class UserViewSetTests(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            email='testuser@example.com',
            name='Test',
            surname='User',
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

    def test_list_users(self):
        response = self.client.get('/api/v1/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_create_user(self):
        data = {
            'email': 'newuser@example.com',
            'name': 'New',
            'surname': 'User',
            'password': 'newpassword'
        }
        response = self.client.post('/api/v1/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserModel.objects.count(), 2)

    def test_update_user(self):
        data = {'name': 'Updated'}
        response = self.client.patch(f'/api/v1/users/{self.user.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Updated')

    def test_delete_user(self):
        response = self.client.delete(f'/api/v1/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(UserModel.objects.count(), 0)

class UserAddressViewSetTests(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            email='testuser@example.com',
            name='Test',
            surname='User',
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_user_address(self):
        data = {
            'country': 'Country',
            'state': 'State',
            'city': 'City',
            'street_address': '123 Street',
            'postal_code': '12345',
            'user': self.user.id
        }
        response = self.client.post('/api/v1/user-addresses/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserAddress.objects.count(), 1)

    def test_list_user_addresses(self):
        UserAddress.objects.create(
            country='Country',
            state='State',
            city='City',
            street_address='123 Street',
            postal_code='12345',
            user=self.user
        )
        response = self.client.get('/api/v1/user-addresses/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UserPhoneNumberViewSetTests(APITestCase):
    def setUp(self):
        self.user = UserModel.objects.create_user(
            email='testuser@example.com',
            name='Test',
            surname='User',
            password='testpassword'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_user_phone_number(self):
        data = {
            'code': '+44',
            'phone_number': 12345678,
            'user': self.user.id
        }
        response = self.client.post('/api/v1/user-phone-numbers/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED, msg=response.data)


    def test_list_user_phone_numbers(self):
        response = self.client.get('/api/v1/user-phone-numbers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class AuthViewsTests(APITestCase):
    def test_register_user(self):
        data = {
            'email': 'registeruser@example.com',
            'name': 'Register',
            'surname': 'User',
            'password': 'Password12#$%'
        }
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_user(self):
        data = {
            'email': 'testuser@example.com',
            'password': 'testpassword'
        }
        response = self.client.post('/api/login/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_password(self):
        data = {
            'user_id': self.user.id,
            'current_password': 'testpassword',
            'new_password': 'newpassword'
        }
        response = self.client.post('/api/user-password/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(UserModel.objects.get(id=self.user.id).check_password('newpassword'))

    def test_logout(self):
        refresh_token = RefreshToken.for_user(self.user)
        data = {'access': str(refresh_token)}
        response = self.client.post('/api/logout/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
