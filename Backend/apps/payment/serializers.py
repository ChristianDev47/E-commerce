from rest_framework import serializers
from .models import Payment
from django.utils.translation import gettext_lazy as _


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            'id',
            'card_number',
            'name',
            'user',
            'due_date',
            'cvc',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'user']
        depth = 1

    def validate_card_number(self, value):
        if not value.isdigit() or len(value) not in [13, 16, 19]:
            raise serializers.ValidationError(_("Enter a valid card number"))
        return value

    def validate_cvc(self, value):
        if not value.isdigit() or len(value) not in [3, 4]:
            raise serializers.ValidationError(_("Enter a valid CVC code"))
        return value
