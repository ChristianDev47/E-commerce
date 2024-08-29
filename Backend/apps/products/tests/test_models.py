from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.products.models import ProductCategory, Product, ProductImage

class ProductCategoryTestCase(TestCase):
    def setUp(self):
        self.category = ProductCategory.objects.create(name="Electronics")

    def test_category_creation(self):
        self.assertEqual(self.category.name, "Electronics")

    def test_category_str_representation(self):
        self.assertEqual(str(self.category), "Electronics")
        
class ProductTestCase(TestCase):
    def setUp(self):
        self.category = ProductCategory.objects.create(name="Electronics")
        self.product = Product.objects.create(
            title="Laptop",
            description="A powerful laptop for all your needs",
            price=999.99,
            quantity=10,
            rating=4.5,
            category=self.category
        )

    def test_product_creation(self):
        self.assertEqual(self.product.title, "Laptop")
        self.assertEqual(self.product.description, "A powerful laptop for all your needs")
        self.assertEqual(self.product.price, 999.99)
        self.assertEqual(self.product.quantity, 10)
        self.assertEqual(self.product.rating, 4.5)
        self.assertEqual(self.product.category, self.category)

    def test_product_str_representation(self):
        self.assertEqual(str(self.product), "Laptop")

class ProductImageTestCase(TestCase):
    def setUp(self):
        self.category = ProductCategory.objects.create(name="Electronics")
        self.product = Product.objects.create(
            title="Headphones",
            description="High-quality headphones for music lovers",
            price=49.99,
            quantity=50,
            rating=4.0,
            category=self.category
        )
        self.image = ProductImage.objects.create(
            product=self.product,
            image='path_to_your_image.jpg' 
        )

    def test_product_image_creation(self):
        self.assertEqual(self.image.product, self.product)

    def test_product_image_str_representation(self):
        self.assertIn('path_to_your_image.jpg', str(self.image))  