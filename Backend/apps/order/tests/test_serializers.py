from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.products.models import Product, ProductCategory, ProductImage
from apps.user.models import UserAddress
from apps.order.models import Order, OrderItem
from apps.order.serializers import OrderReadSerializer, OrderWriteSerializer, OrderItemSerializer, ProductSerializer, ProductImageSerializer

User = get_user_model()


class OrderSerializerTestCase(TestCase):

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

        self.product_image1 = ProductImage.objects.create(
            product=self.product1,
            image='http://example.com/image1.jpg'
        )
        self.product_image2 = ProductImage.objects.create(
            product=self.product2,
            image='http://example.com/image2.jpg'
        )

        self.order = Order.objects.create(
            buyer=self.user,
            status=Order.PENDING,
            shipping_address=self.address
        )
        self.order_item1 = OrderItem.objects.create(
            order=self.order,
            product=self.product1,
            quantity=3
        )
        self.order_item2 = OrderItem.objects.create(
            order=self.order,
            product=self.product2,
            quantity=2
        )

    def test_order_item_serializer(self):
        class MockView:
            kwargs = {'order_id': self.order.id}

        serializer = OrderItemSerializer(
            self.order_item1, context={'view': MockView()})
        data = serializer.data

        self.assertEqual(data['product']['id'], self.product1.id)
        self.assertEqual(data['quantity'], self.order_item1.quantity)
        self.assertEqual(data['price'], self.product1.price)
        self.assertEqual(data['cost'], self.order_item1.cost)

    def test_order_item_serializer_invalid(self):
        data = {
            'order': self.order.id,
            'product_id': self.product1.id,
            'quantity': -1
        }
        serializer = OrderItemSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('quantity', serializer.errors)

    def test_order_read_serializer(self):
        serializer = OrderReadSerializer(self.order)
        data = serializer.data

        self.assertEqual(data['id'], self.order.id)
        self.assertEqual(
            data['buyer'], f"{self.user.name} {self.user.surname}")
        self.assertEqual(data['shipping_address']
                         ['country'], self.address.country)
        self.assertEqual(len(data['order_items']), 2)
        self.assertEqual(data['total_cost'], self.order.total_cost)

    def test_order_write_serializer_create(self):
        data = {
            'buyer': self.user.id,
            'shipping_address': self.address.id,
            'status': Order.PENDING,
            'order_items': [
                {'product_id': self.product1.id, 'quantity': 1},
                {'product_id': self.product2.id, 'quantity': 2}
            ]
        }
        serializer = OrderWriteSerializer(data=data)
        if serializer.is_valid():
            order = serializer.save()
            self.assertEqual(Order.objects.count(), 1)
            self.assertEqual(OrderItem.objects.count(), 2)
            self.assertEqual(
                order.total_cost, (1 * self.product1.price) + (2 * self.product2.price))
        else:
            self.fail(f"Serializer errors: {serializer.errors}")

    def test_order_write_serializer_invalid(self):
        data = {
            'buyer': self.user.id,
            'shipping_address': self.address.id,
            'status': Order.PENDING,
            'order_items': [
                {'product_id': self.product1.id, 'quantity': -1}
            ]
        }
        serializer = OrderWriteSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('order_items', serializer.errors)

    def test_product_image_serializer(self):
        serializer = ProductImageSerializer(self.product_image1)
        data = serializer.data

        self.assertEqual(data['id'], self.product_image1.id)
        self.assertEqual(data['image'], self.product_image1.image)

    def test_product_serializer(self):
        serializer = ProductSerializer(self.product1)
        data = serializer.data

        self.assertEqual(data['id'], self.product1.id)
        self.assertEqual(data['title'], self.product1.title)
        self.assertEqual(data['images'][0]['image'], self.product_image1.image)
