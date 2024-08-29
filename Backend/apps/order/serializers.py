from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.models import Product, ProductImage
from decimal import Decimal


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ("__all__")


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'price', 'images')


class OrderItemSerializer(serializers.ModelSerializer):
    price = serializers.SerializerMethodField()
    cost = serializers.SerializerMethodField()
    product_id = serializers.PrimaryKeyRelatedField(
        source='product', queryset=Product.objects.all(), write_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "product",
            "product_id",
            "quantity",
            "price",
            "cost",
            "created_at",
            "updated_at",
        )
        depth = 1
        read_only_fields = ("product",)

    def validate(self, validated_data):
        order_quantity = validated_data["quantity"]
        product_quantity = validated_data["product"].quantity

        order_id = self.context["view"].kwargs.get("order_id")
        product = validated_data["product"]
        current_item = OrderItem.objects.filter(
            order__id=order_id, product=product)

        if order_quantity > product_quantity:
            error = {"quantity": _("Ordered quantity is more than the stock.")}
            raise serializers.ValidationError(error)

        if not self.instance and current_item.count() > 0:
            error = {"product": _("Product already exists in your order.")}
            raise serializers.ValidationError(error)

        return validated_data

    def get_price(self, obj: OrderItem) -> Decimal:
        return obj.product.price

    def get_cost(self, obj: OrderItem) -> Decimal:
        return obj.cost


class OrderReadSerializer(serializers.ModelSerializer):
    buyer = serializers.SerializerMethodField(read_only=True)
    order_items = OrderItemSerializer(read_only=True, many=True)
    total_cost = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "buyer",
            "shipping_address",
            "order_items",
            "total_cost",
            "status",
            "created_at",
            "updated_at",
        )
        depth = 1

    def get_buyer(self, obj: Order) -> str:
        return f"{obj.buyer.name} {obj.buyer.surname}"

    def get_total_cost(self, obj: Order) -> Decimal:
        return obj.total_cost


class OrderWriteSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "buyer",
            "shipping_address",
            "status",
            "order_items",
        )

    def create(self, validated_data):
        orders_data = validated_data.pop("order_items")
        order = Order.objects.create(**validated_data)

        for order_data in orders_data:
            OrderItem.objects.create(order=order, **order_data)

        return order
