from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from apps.products.models import Product, ProductCategory
from apps.order.models import Order, OrderItem
from rest_framework.test import APIClient
from apps.user.models import UserAddress


User = get_user_model()


class OrderAndOrderItemViewSetTestCase(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            name='Test', surname='User', email='testuser@example.com', password='Password12#'
        )
        self.client.force_authenticate(user=self.user)

        self.category = ProductCategory.objects.create(name='Electronics')
        self.product = Product.objects.create(
            title='Product 1', description='Description', price=10.00, quantity=20, rating=4.5, category=self.category
        )
        self.order = Order.objects.create(
            buyer=self.user, status=Order.PENDING)
        self.order_item = OrderItem.objects.create(
            order=self.order, product=self.product, quantity=1)
        self.address = UserAddress.objects.create(
            user=self.user,
            street_address='123 Calle Principal',
            city='Ciudad de Ejemplo',
            state='Estado de Ejemplo',
            country='País de Ejemplo',
            postal_code='12345'
        )
    # Tests for OrderViewSet

    def test_order_list(self):
        url = '/api/v1/orders/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_order_create(self):
        url = '/api/v1/orders/'
        data = {
            'buyer': self.user.id,
            'status': Order.PENDING,
            'shipping_address': self.address.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 2)

    def test_order_update(self):
        url = f'/api/v1/orders/{self.order.id}/'
        data = {'status': Order.COMPLETED}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.order.refresh_from_db()
        self.assertEqual(self.order.status, Order.COMPLETED)

    def test_order_delete(self):
        url = f'/api/v1/orders/{self.order.id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Order.objects.count(), 0)
