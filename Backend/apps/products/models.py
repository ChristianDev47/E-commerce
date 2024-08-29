from django.db import models
from django.core.files.storage import FileSystemStorage
from django.core.exceptions import ValidationError
import cloudinary.uploader

class CloudinaryStorage(FileSystemStorage):
    def __init__(self, folder=None, *args, **kwargs):
        self.folder = folder
        super().__init__(*args, **kwargs)

    def _save(self, name, content):
        try:
            # Upload the image to Cloudinary with the specified folder path
            response = cloudinary.uploader.upload(content, folder=self.folder)
            return response['secure_url']
        except Exception as e:
            raise ValidationError(f"Error uploading image to Cloudinary: {e}")

    def url(self, name):
        return name

    def exists(self, name):
        return False

class ProductCategory(models.Model):
    name = models.CharField(max_length=255)
    icon = models.ImageField(storage=CloudinaryStorage(folder='projects/ecommerce/categories/icons'), max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField("Description", blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    quantity = models.IntegerField(default=1)
    rating = models.DecimalField(decimal_places=1, default=0, max_digits=10)
    category = models.ForeignKey(ProductCategory, related_name="products", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.title

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(storage=CloudinaryStorage(folder='projects/ecommerce/products/images'), max_length=255)

    def __str__(self):
        return self.image.url
