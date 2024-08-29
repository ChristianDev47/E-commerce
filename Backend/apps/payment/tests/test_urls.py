# apps/products/tests/test_urls.py

from django.test import SimpleTestCase
from django.urls import reverse, resolve
from apps.products.views import ProductCategoryViewSet, ProductViewSet, ProductImageViewSet


class TestProductURLs(SimpleTestCase):

    def test_products_url_resolves(self):
        url = reverse('products-list')
        self.assertEqual(resolve(url).func.cls, ProductViewSet)

    def test_categories_url_resolves(self):
        url = reverse('categories-list')
        self.assertEqual(resolve(url).func.cls, ProductCategoryViewSet)

    def test_productImage_url_resolves(self):
        url = reverse('productImage-list')
        self.assertEqual(resolve(url).func.cls, ProductImageViewSet)
