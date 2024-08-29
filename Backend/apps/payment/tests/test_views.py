from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from apps.payment.models import Payment

User = get_user_model()


class PaymentViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            name='Test', surname='User', email='testuser@example.com', password='Password12#'
        )
        self.other_user = User.objects.create_user(
            name='Other', surname='User', email='otheruser@example.com', password='Password12#'
        )
        self.payment = Payment.objects.create(
            card_number='1234567812345678',
            name='John Doe',
            user=self.user,
            due_date='12/25',
            cvc='123'
        )
        self.payment_url = '/api/v1/payment_cards/'
        self.client.login(email='testuser@example.com', password='Password12#')

    def test_list_payments(self):
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(
            response.data[0]['card_number'], self.payment.card_number)

    def test_retrieve_payment(self):
        response = self.client.get(f'{self.payment_url}{self.payment.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data['card_number'], self.payment.card_number)

    def test_create_payment(self):
        data = {
            'card_number': '9876543210987654',
            'name': 'Jane Doe',
            'due_date': '11/24',
            'cvc': '321'
        }
        response = self.client.post(self.payment_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Payment.objects.count(), 2)
        self.assertEqual(Payment.objects.latest(
            'created_at').card_number, data['card_number'])

    def test_update_payment(self):
        data = {
            'card_number': '1111222233334444',
            'name': 'Jane Smith',
            'due_date': '10/23',
            'cvc': '456'
        }
        response = self.client.put(
            f'{self.payment_url}{self.payment.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.payment.refresh_from_db()
        self.assertEqual(self.payment.card_number, data['card_number'])

    def test_delete_payment(self):
        response = self.client.delete(f'{self.payment_url}{self.payment.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Payment.objects.count(), 0)

    def test_permission_restriction(self):
        self.client.logout()
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.login(email='otheruser@example.com',
                          password='Password12#')
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_user_association(self):
        new_payment = Payment.objects.create(
            card_number='5555666677778888',
            name='Alice Doe',
            user=self.user,
            due_date='09/26',
            cvc='789'
        )
        response = self.client.get(f'{self.payment_url}{new_payment.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['card_number'], new_payment.card_number)
