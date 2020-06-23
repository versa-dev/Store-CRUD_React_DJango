from django.test import TestCase
from django.urls import reverse
from products.models import Category
from products.models import Products
from accounts.models import UserAccount

class CategoryListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        
        number_of_categories = 8

        for id in range(number_of_categories):
            Category.objects.create(
                name=f'Category {id}',
                stock=id,
            )
        test_user1 = UserAccount.objects.create_user(name='admin',email='admin@gmail.com', password='password')
        test_user2 = UserAccount.objects.create_user(name='user',email='user@gmail.com', password='password')

        test_user1.save()
        test_user2.save()

    def test_if_logged_in_working(self):
        response = self.client.get('/api/category/')
        self.assertEqual(response.results.code,"token_not_valid")

    def test_view_url_exists_at_desired_location(self):
        login = self.client.login(email='admin@gmail.com', password='password')
        response = self.client.get('/api/category/')
        self.assertEqual(response.status_code, 200)

    def test_pagination_is_five(self):
        login = self.client.login(email='admin@gmail.com', password='password')
        response = self.client.get(reverse('/api/category/'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue('next' in response.data)
        self.assertTrue(len(response.results) == 5)

    def test_lists_all_categorys(self):
        # Get second page and confirm it has (exactly) remaining 3 items
        login = self.client.login(email='admin@gmail.com', password='password')
        response = self.client.get('/api/category/'+'?page=2')
        self.assertEqual(response.status_code, 200)
        self.assertTrue('previous' in response.data)
        self.assertTrue(response.data['next'] == null)
        self.assertTrue(len(response.data.results) == 3)
    
    def test_post_new_category(self):
        login = self.client.login(email='admin@gmail.com', password='password')  
        response = self.client.post('/api/category',{'name':'newcategory','stock':5})
        self.assertTrue(response.status_code, 201)
    
