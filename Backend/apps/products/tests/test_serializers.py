from django.test import TestCase
from django.contrib.auth import get_user_model
from apps.products.models import Product, ProductCategory, ProductImage
from apps.products.serializers import (
    ProductCategoryReadSerializer,
    ProductImageReadSerializer,
    ProductReadSerializer,
    ProductWriteSerializer
)

User = get_user_model()

class ProductSerializersTestCase(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(name='Test', surname='User', email='testuser@example.com', password='Password12#')
        self.category = ProductCategory.objects.create(name='Electronics', icon='http://example.com/icon.jpg')
        self.product = Product.objects.create(
            title='Product 1', description='Description', price=10.00, quantity=20, rating=4.5, category=self.category
        )
        self.product_image = ProductImage.objects.create(
            product=self.product, image='http://example.com/image.jpg'
        )
        self.product_serializer = ProductReadSerializer(instance=self.product)
        self.product_write_serializer = ProductWriteSerializer(instance=self.product)
        self.category_serializer = ProductCategoryReadSerializer(instance=self.category)
        self.product_image_serializer = ProductImageReadSerializer(instance=self.product_image)

    def test_product_category_serializer(self):
        data = self.category_serializer.data
        expected_keys = {'id', 'name', 'icon', 'created_at', 'updated_at'}
        self.assertEqual(set(data.keys()), expected_keys)
        self.assertEqual(data['name'], 'Electronics')
        self.assertEqual(data['icon'], 'http://example.com/icon.jpg')


    def test_product_image_serializer(self):
        data = self.product_image_serializer.data
        expected_keys = {'id', 'product', 'image'}
        self.assertEqual(set(data.keys()), expected_keys)
        self.assertEqual(data['image'], 'http://example.com/image.jpg')

    def test_product_read_serializer(self):
        data = self.product_serializer.data
        expected_keys = {'id', 'title', 'description', 'price', 'quantity', 'rating', 'created_at', 'updated_at', 'category', 'images'}
        self.assertEqual(set(data.keys()), expected_keys)
        self.assertEqual(data['title'], 'Product 1')
        self.assertEqual(data['category']['id'], self.category.id)  
        self.assertEqual(len(data['images']), 1)
        self.assertEqual(data['images'][0]['image'], 'http://example.com/image.jpg')

    def test_product_write_serializer(self):
        data = self.product_write_serializer.data
        expected_keys = {'title', 'description', 'price', 'quantity', 'rating', 'category'}
        self.assertEqual(set(data.keys()), expected_keys)
        self.assertEqual(data['title'], 'Product 1')
        self.assertEqual(float(data['price']), 10.0)  
        self.assertEqual(data['quantity'], 20)
        self.assertEqual(float(data['rating']), 4.5)  
        self.assertEqual(data['category'], self.category.id) 

    def test_product_write_serializer_validation(self):
        serializer = ProductWriteSerializer(data={
            'title': 'New Product',
            'description': 'New Description',
            'price': 15.00,
            'quantity': 30,
            'rating': 4.8,
            'category': self.category.id,  
        })
        self.assertTrue(serializer.is_valid())
        validated_data = serializer.validated_data
        self.assertEqual(validated_data['title'], 'New Product')
        self.assertEqual(float(validated_data['price']), 15.00)
        self.assertEqual(validated_data['quantity'], 30)
        self.assertEqual(float(validated_data['rating']), 4.8)
        self.assertEqual(validated_data['category'].id, self.category.id)  
