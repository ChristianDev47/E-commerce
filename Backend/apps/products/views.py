from rest_framework import permissions, viewsets

from .models import Product, ProductCategory, ProductImage
from .serializers import (
    ProductCategoryReadSerializer,
    ProductImageReadSerializer,
    ProductReadSerializer,
    ProductWriteSerializer,
)


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all().order_by("id")
    serializer_class = ProductCategoryReadSerializer
    permission_classes = [permissions.AllowAny]

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all().order_by("id")
    serializer_class = ProductImageReadSerializer
    permission_classes = [permissions.AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by("id")

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return ProductWriteSerializer

        return ProductReadSerializer

    def get_permissions(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.AllowAny]

        return super().get_permissions()