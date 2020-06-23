from django.test import TestCase
from accounts.views import MyTokenObtainPairView
from rest_framework.test import APIClient

class ViewTestCase(TestCase):
    def is_staff_test(self):
        response = self.client.post('/api/token',email="admin@gmail.com", password="password")
        self.assertEqual(response.is_staff,True)
    
    def with_email_login(self):
        client = APIClient()
        client.login(email='admin@gmail.com', password='password')
        