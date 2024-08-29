from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.products.models import Product, ProductCategory
from apps.user.models import UserAddress
from apps.order.models import Order, OrderItem

User = get_user_model()


class OrderModelTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            name='Test', surname='User', email='testuser@example.com', password='Password12#')
        self.address = UserAddress.objects.create(
            user=self.user,
            street_address='123 Calle Principal',
            city='Ciudad de Ejemplo',
            state='Estado de Ejemplo',
            country='País de Ejemplo',
            postal_code='12345'
        )
        self.category = ProductCategory.objects.create(
            name='Electronics'
        )
        self.product1 = Product.objects.create(
            title='Product 1',
            description='Description for Product 1',
            price=10.00,
            quantity=20,
            rating=4.5,
            category=self.category
        )
        self.product2 = Product.objects.create(
            title='Product 2',
            description='Description for Product 2',
            price=20.00,
            quantity=15,
            rating=4.0,
            category=self.category
        )

    def test_order_creation(self):
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )

        OrderItem.objects.create(
            order=order,
            product=self.product1,
            quantity=3
        )
        OrderItem.objects.create(
            order=order,
            product=self.product2,
            quantity=2
        )

        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(order.order_items.count(), 2)
        self.assertEqual(order.total_cost, 70.00)

    def test_order_item_cost_calculation(self):
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )

        order_item = OrderItem.objects.create(
            order=order,
            product=self.product1,
            quantity=5
        )

        self.assertEqual(order_item.cost, 50.00)

    def test_order_str_method(self):
        # Crear una orden de prueba
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )

        self.assertEqual(str(order), self.user.get_full_name())

    def test_order_total_cost_with_multiple_items(self):
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )

        OrderItem.objects.create(
            order=order,
            product=self.product1,
            quantity=2
        )
        OrderItem.objects.create(
            order=order,
            product=self.product2,
            quantity=3
        )

        expected_total = (2 * self.product1.price) + (3 * self.product2.price)
        self.assertEqual(order.total_cost, expected_total)

    def test_order_without_items_has_zero_total_cost(self):
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )

        self.assertEqual(order.total_cost, 0.00)

    def test_order_item_str_method(self):
        order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )
        order_item = OrderItem.objects.create(
            order=order,
            product=self.product1,
            quantity=1
        )

        self.assertEqual(str(order_item), self.user.get_full_name())

    def test_order_status_choices(self):
        for status, _ in Order.STATUS_CHOICES:
            order = Order.objects.create(
                buyer=self.user,
                status=status,
                shipping_address=self.address
            )
            self.assertEqual(order.status, status)
