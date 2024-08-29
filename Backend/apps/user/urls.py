from django.urls import path, include
from rest_framework import routers
from .views import (
    UserViewSet, 
    UserAddressViewSet, 
    UserPhoneNumberViewSet, 
    UpdatePasswordView
)

app_name = "users"

router = routers.DefaultRouter()
router.register('users', UserViewSet, 'users')
router.register('user-addresses', UserAddressViewSet, 'user-addresses')
router.register('user-phone-numbers', UserPhoneNumberViewSet, 'user-phone-numbers')

urlpatterns = [
    path('', include(router.urls)),
    path('user-password/', UpdatePasswordView.as_view(), name='user-password'),
]