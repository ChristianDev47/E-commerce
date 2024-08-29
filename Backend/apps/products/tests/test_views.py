from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from apps.products.models import Product, ProductCategory, ProductImage
from django.core.files.uploadedfile import SimpleUploadedFile

User = get_user_model()

class ProductAPITestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(name='Test', surname='User', email='testuser@example.com', password='Password12#')
        self.category = ProductCategory.objects.create(name='Electronics')
        self.product = Product.objects.create(
            title='Product 1', description='Description', price=10.00, quantity=20, rating=4.5, category=self.category
        )
        self.product_image = ProductImage.objects.create(
            product=self.product, image='image.jpg'  
        )
        self.client.force_authenticate(user=self.user)

    def test_product_category_list(self):
        response = self.client.get('/api/v1/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Electronics')

    def test_product_image_list(self):
        response = self.client.get('/api/v1/productImage/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['image'], 'image.jpg')

    def test_product_list(self):
        response = self.client.get('/api/v1/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Product 1')

    def test_create_product_category(self):
        icon = SimpleUploadedFile(name='icon_books.jpg', content=b'', content_type='image/jpeg')
        data = {'name': 'Books', 'icon': icon}
        response = self.client.post('/api/v1/categories/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProductCategory.objects.count(), 2)
        self.assertEqual(ProductCategory.objects.latest('id').name, 'Books')

    def test_create_product_image(self):
        image = SimpleUploadedFile(name='image2.jpg', content=b'', content_type='image/jpeg')
        data = {'product': self.product.id, 'image': image}
        response = self.client.post('/api/v1/productImage/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProductImage.objects.count(), 2)
        self.assertEqual(ProductImage.objects.latest('id').image.name, 'image2.jpg')

    def test_create_product(self):
        data = {
            'title': 'Product 2',
            'description': 'Another Description',
            'price': 20.00,
            'quantity': 30,
            'rating': 4.8,
            'category': self.category.id
        }
        response = self.client.post('/api/v1/products/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 2)
        self.assertEqual(Product.objects.latest('id').title, 'Product 2')

    def test_update_product_category(self):
        category = ProductCategory.objects.create(name='Clothing')
        icon = SimpleUploadedFile(name='icon_apparel.jpg', content=b'', content_type='image/jpeg')
        data = {'name': 'Apparel', 'icon': icon}
        response = self.client.put(f'/api/v1/categories/{category.id}/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ProductCategory.objects.get(id=category.id).name, 'Apparel')

    def test_update_product_image(self):
        image = SimpleUploadedFile(name='image_updated.jpg', content=b'', content_type='image/jpeg')
        data = {'image': image}
        response = self.client.put(f'/api/v1/productImage/{self.product_image.id}/', data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(ProductImage.objects.get(id=self.product_image.id).image.name, 'image_updated.jpg')

    def test_update_product(self):
        data = {
            'title': 'Product 1 Updated',
            'description': 'Updated Description',
            'price': 15.00,
            'quantity': 25,
            'rating': 4.9,
            'category': self.category.id
        }
        response = self.client.put(f'/api/v1/products/{self.product.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Product.objects.get(id=self.product.id).title, 'Product 1 Updated')

    def test_delete_product_category(self):
        category = ProductCategory.objects.create(name='Toys')
        response = self.client.delete(f'/api/v1/categories/{category.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ProductCategory.objects.count(), 1)

    def test_delete_product_image(self):
        response = self.client.delete(f'/api/v1/productImage/{self.product_image.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ProductImage.objects.count(), 0)

    def test_delete_product(self):
        response = self.client.delete(f'/api/v1/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 0)
