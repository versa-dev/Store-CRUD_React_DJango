from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, generics, status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.pagination import PageNumberPagination

from .models import UserAccount
from .serializers import AccountSerializers
from .permissions import IsStaffOnly

class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request,format=None):
        data = self.request.data
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error':'email already exists'})
            else:
                if len(password)<6:
                    return Response({'error':'Password must be at least 6 characters'})
                else:
                    user = User.objects.create_user(email=email,password=password,name=name)
                    user.save()

                    return Response({'success':'User created successfully'})
        else:
            return Response({'error':'Passwords do not match'})

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Add extra responses here
        data['is_staff'] = self.user.is_staff
        data['is_admin'] = self.user.is_superuser
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class AccountListView(APIView, PageNumberPagination):
    permission_classes = [permissions.IsAuthenticated, IsStaffOnly]

    def get(self, request, format=None):
        users = UserAccount.objects.filter(is_staff=False)
        results = self.paginate_queryset(users, request, view=self)
        serializer = AccountSerializers(results, many=True)
        return self.get_paginated_response(serializer.data)
    
    def post(self,request,format=None):
        data = self.request.data
    
        name = data['name']
        email = data['email']
        password = data['password']
        password2 = data['password2']
        is_staff = data['is_staff']
        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({'error':'email already exists'})
            else:
                if len(password)<6:
                    return Response({'error':'Password must be at least 6 characters'})
                else:
                    user = User.objects.create_user(email=email,password=password,name=name, is_staff=is_staff)
                    user.save()

                    return Response({'success':'User created successfully'})
        else:
            return Response({'error':'Passwords do not match'})


class AccountDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsStaffOnly]
    queryset = UserAccount.objects.filter(is_staff=False)
    serializer_class = AccountSerializers