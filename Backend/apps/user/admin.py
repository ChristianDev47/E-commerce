from django.contrib import admin
from .models import User, UserAddress, UserPhoneNumber, UserAccessToken

# Register your models here.
admin.site.register(User)
admin.site.register(UserAddress)
admin.site.register(UserPhoneNumber)
admin.site.register(UserAccessToken)