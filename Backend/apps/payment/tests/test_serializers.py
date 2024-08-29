from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from apps.payment.models import Payment
from apps.payment.serializers import PaymentSerializer

User = get_user_model()


class PaymentSerializerTestCase(TestCase):

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
        self.serializer = PaymentSerializer(instance=self.payment)

    def test_payment_serializer_fields(self):
        data = self.serializer.data
        expected_fields = [
            'id', 'card_number', 'name', 'user', 'due_date', 'cvc', 'created_at', 'updated_at'
        ]
        self.assertEqual(set(data.keys()), set(expected_fields))

    def test_payment_serializer_read_only_fields(self):
        self.assertIn('id', self.serializer.Meta.read_only_fields)
        self.assertIn('created_at', self.serializer.Meta.read_only_fields)
        self.assertIn('updated_at', self.serializer.Meta.read_only_fields)
        self.assertIn('user', self.serializer.Meta.read_only_fields)

    def test_valid_card_number(self):
        serializer = PaymentSerializer(data={
            'card_number': '1234567812345678',
            'name': 'Jane Doe',
            'user': self.user.id,
            'due_date': '11/24',
            'cvc': '321'
        })
        self.assertTrue(serializer.is_valid())
        self.assertEqual(
            serializer.validated_data['card_number'], '1234567812345678')

    def test_invalid_card_number(self):
        serializer = PaymentSerializer(data={
            'card_number': '1234abc5678901234',
            'name': 'Jane Doe',
            'user': self.user.id,
            'due_date': '11/24',
            'cvc': '321'
        })
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'card_number'})
        self.assertEqual(
            serializer.errors['card_number'],
            ['Enter a valid card number']
        )

    def test_valid_cvc(self):
        serializer = PaymentSerializer(data={
            'card_number': '1234567812345678',
            'name': 'Jane Doe',
            'user': self.user.id,
            'due_date': '11/24',
            'cvc': '321'
        })
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['cvc'], '321')

    def test_invalid_cvc(self):
        serializer = PaymentSerializer(data={
            'card_number': '1234567812345678',
            'name': 'Jane Doe',
            'user': self.user.id,
            'due_date': '11/24',
            'cvc': 'abc'
        })
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), {'cvc'})
        self.assertEqual(
            serializer.errors['cvc'],
            ['Enter a valid CVC code']
        )
