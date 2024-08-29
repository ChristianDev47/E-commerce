from django.shortcuts import get_object_or_404
from django.utils.translation import gettext_lazy as _
from rest_framework.permissions import BasePermission

from .models import Order


class IsOrderPending(BasePermission):
    """
    Check the status of the order is pending or completed before updating/deleting the instance.
    Allows updating to 'canceled' status even if the order is not pending.
    """

    message = _("Updating or deleting a closed order is not allowed.")

    def has_object_permission(self, request, view, obj):
        if view.action in ("retrieve",):
            return True
        if view.action in ("update", "partial_update"):
            # Allow update if the new status is 'cancelada'
            new_status = request.data.get('status')
            if new_status == "Cancelada":
                return True
        return obj.status == "Pendiente"


class IsOrderItemByBuyerOrAdmin(BasePermission):
    """
    Check if the order item is owned by the appropriate buyer or admin
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return obj.buyer == request.user or request.user.is_staff


class IsOrderByBuyerOrAdmin(BasePermission):
    """
    Check if the order is owned by the appropriate buyer or admin
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated is True

    def has_object_permission(self, request, view, obj):
        return obj.buyer == request.user or request.user.is_staff


class IsOrderItemPending(BasePermission):
    """
    Check the status of the order is pending or completed before creating, updating, and deleting order items
    """

    message = _(
        "Creating, updating, or deleting order items for a closed order is not allowed."
    )

    def has_permission(self, request, view):
        order_id = view.kwargs.get("order_id")
        order = get_object_or_404(Order, id=order_id)

        if view.action in ("list",):
            return True

        return order.status == "Pendiente"

    def has_object_permission(self, request, view, obj):
        if view.action in ("retrieve",):
            return True
        return obj.order.status == "Pendiente"
