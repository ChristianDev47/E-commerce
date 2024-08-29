from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.user.models import User


class Payment(models.Model):
    card_number = models.CharField(
        _("Card Number"),
        max_length=20,
        help_text=_("Enter the 16-digit card number"),
    )
    name = models.CharField(
        _("Name on Card"),
        max_length=50,
        help_text=_("Enter the name as it appears on the card"),
    )
    user = models.ForeignKey(
        User,
        related_name="payments",
        on_delete=models.CASCADE,
        verbose_name=_("User"),
    )
    due_date = models.CharField(
        _("Due Date"),
        max_length=20,
        help_text=_("Enter the card's expiration date"),
    )
    cvc = models.CharField(
        _("CVC"),
        max_length=4,
        help_text=_("Enter the 3 or 4-digit security code"),
    )
    created_at = models.DateTimeField(
        _("Created At"),
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        _("Updated At"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Payment")
        verbose_name_plural = _("Payments")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.card_number}"
