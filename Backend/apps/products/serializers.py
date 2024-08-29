from rest_framework import serializers
from .models import Product, ProductCategory, ProductImage


class ProductCategoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"

class ProductImageReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = "__all__"


class ProductReadSerializer(serializers.ModelSerializer):
    images = ProductImageReadSerializer(many=True, read_only=True)  
    class Meta:
        model = Product
        fields = (
            "id", 
            "title", 
            "description", 
            "price", 
            "quantity", 
            "rating", 
            "created_at", 
            "updated_at", 
            "category",
            "images"
        )
        depth = 1

class ProductWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            "title",
            "description",
            "price",
            "quantity",
            "rating",
            "category",
        )
        