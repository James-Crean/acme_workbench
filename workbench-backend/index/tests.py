import json

from django.test import TestCase
from django.test import Client


class IndexViewTests(TestCase):
    fixtures = ['seed.json']
    """
    Tests for the Index app views
    """
    def test_get_index(self):
        """
        Test that the index page returns success
        """
        client = Client()
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_get_workbench_no_login(self):
        """
        Test that the workbench redirects when not logged in
        """
        client = Client()
        response = client.get('/workbench')
        self.assertEqual(response.status_code, 302)
    
    def test_get_workbench_with_login(self):
        """
        Test that the workbench renders when logged in
        """
        client = Client()
        self.assertTrue(
            client.login(
                username='test_user',
                password='qwertyuiop'))
        res = client.get('/workbench')
        self.assertEqual(res.status_code, 200)
    
    def test_valid_user_registration(self):
        """
        test ability to register new users
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        post_data = {
            'username': 'test_user1',
            'password1': 'test_pass',
            'password2': 'test_pass',
            'firstname': 'test',
            'lastname': 'test',
            'email': 'test@test.com'
        }
        res = client.post('/register', post_data)
        self.assertEqual(res.status_code, 200)
    
    def test_invalid_user_registration(self):
        """
        test ability to register new users
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        post_data = {
            'username': 'test_user1',
            'password1': 'test_pass',
            'password2': 'THIS IS NOT VALID',
            'firstname': 'test',
            'lastname': 'test',
            'email': 'test@test.com'
        }
        res = client.post('/register', post_data)
        self.assertNotEqual(res.status_code, 200)
    
    def test_valid_user_login(self):
        """
        test users ability to login with valid credentials
        """
        client = Client()
        post_data = {
            'password': 'qwertyuiop',
            'username': 'test_user'
        }
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 200)
    
    def test_invalid_user_login(self):
        """
        Test rejection of invalid credentials
        """
        client = Client()
        post_data = {
            'username': 'test_user',
            'password': 'IM A LITTLE TEA POT'
        }
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 401)
    
    def test_valid_user_logout(self):
        """
        test users ability to logout
        """
        client = Client()
        post_data = {
            'password': 'qwertyuiop',
            'username': 'test_user'
        }
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 200)

        res = client.get('/logout')
        self.assertEqual(res.status_code, 200)
        self.assertFalse(res.context['request'].user.is_authenticated())

    def test_get_user_list(self):
        client = Client()
        url = '/get_user_list/'
        expected_result = ['test_user', 'baldwin32']
        res = client.get(url)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.content)
        for user in expected_result:
            self.assertTrue(user in data)
