from django.urls import path, include
from rest_framework import routers
from .views import (PaymentViewSet)

app_name = "payment_cards"

router = routers.DefaultRouter()
router.register('payment_cards', PaymentViewSet, 'payment_cards')

urlpatterns = [
    path('', include(router.urls)),
]
