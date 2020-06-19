from rest_framework import serializers
from .models import UserAccount

class AccountSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'