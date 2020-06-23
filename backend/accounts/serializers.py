from rest_framework import serializers
from .models import UserAccount

class AccountSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ['id','name','email','is_staff']