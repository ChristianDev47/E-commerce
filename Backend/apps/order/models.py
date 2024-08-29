from django.db import models

# Create your models here.
from django.contrib.auth import get_user_model
from django.db import models
from django.utils.functional import cached_property
from django.utils.translation import gettext_lazy as _

from apps.products.models import Product
from apps.user.models import UserAddress

User = get_user_model()


class Order(models.Model):
    PENDING = "Pendiente"
    COMPLETED = "Completada"
    CANCEL = "Cancelada"
    STATUS_CHOICES = ((PENDING, _("pending")), (COMPLETED,
                      _("completed")), (CANCEL, _("cancel")))

    buyer = models.ForeignKey(
        User, related_name="buyer_order", on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default=PENDING)
    shipping_address = models.ForeignKey(
        UserAddress,
        related_name="shipping_order",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.buyer.get_full_name()

    @cached_property
    def total_cost(self):
        return round(sum([order_item.cost for order_item in self.order_items.all()]), 2)


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="order_items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Product, related_name="product_orders", on_delete=models.CASCADE
    )
    quantity = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.order.buyer.get_full_name()

    @cached_property
    def cost(self):
        return round(self.quantity * self.product.price, 2)
