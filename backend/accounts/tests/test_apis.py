from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import UserAccount

class AccountTests(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = '/api/signup/'
        data = {'name': 'testuser','email':'testuser@gmail.com','password':'password','password2':'password'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserAccount.objects.count(), 1)
        self.assertEqual(UserAccount.objects.get().name, 'testuser')

    def test_response(self):
        response = self.client.get('/api/users/12')
        self.assertEqual(response.data, {'id': 12, 'username': 'user6'})