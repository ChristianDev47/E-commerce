from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.payment.models import Payment

User = get_user_model()


class PaymentModelTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            name='Test', surname='User', email='testuser@example.com', password='Password12#'
        )
        self.payment = Payment.objects.create(
            card_number='1234567812345678',
            name='John Doe',
            user=self.user,
            due_date='12/25',
            cvc='123'
        )

    def test_payment_creation(self):
        self.assertEqual(Payment.objects.count(), 1)
        self.assertEqual(self.payment.card_number, '1234567812345678')
        self.assertEqual(self.payment.name, 'John Doe')
        self.assertEqual(self.payment.user, self.user)
        self.assertEqual(self.payment.due_date, '12/25')
        self.assertEqual(self.payment.cvc, '123')

    def test_payment_string_representation(self):
        expected_str = f"{self.payment.name} - {self.payment.card_number}"
        self.assertEqual(str(self.payment), expected_str)

    def test_payment_update(self):
        self.payment.card_number = '8765432187654321'
        self.payment.name = 'Jane Doe'
        self.payment.due_date = '11/24'
        self.payment.cvc = '321'
        self.payment.save()
        updated_payment = Payment.objects.get(id=self.payment.id)
        self.assertEqual(updated_payment.card_number, '8765432187654321')
        self.assertEqual(updated_payment.name, 'Jane Doe')
        self.assertEqual(updated_payment.due_date, '11/24')
        self.assertEqual(updated_payment.cvc, '321')

    def test_payment_deletion(self):
        self.payment.delete()
        self.assertEqual(Payment.objects.count(), 0)
