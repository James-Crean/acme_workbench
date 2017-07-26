from django.test import TestCase
from django.test import Client


class IndexViewTests(TestCase):
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
    
    def test_get_workbench(self):
        """
        Test that the workbench page returns success
        """
        client = Client()
        response = client.get('/workbench')
        self.assertEqual(response.status_code, 200)
    
    def test_valid_user_registration(self):
        """
        test ability to register new users
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        test_user = 'test_user'
        test_pass = 'test_pass'
        test_email = 'test@test.com'
        first = 'test'
        last = 'user'

        post_data = {
            'username': test_user,
            'password1': test_pass,
            'password2': test_pass,
            'firstname': first,
            'lastname': last,
            'email': test_email
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

        test_user = 'test_user'
        test_pass = 'test_pass'
        test_email = 'test@test.com'
        first = 'test'
        last = 'user'

        post_data = {
            'username': test_user,
            'password1': test_pass,
            'password2': 'THIS IS NOT VALID',
            'firstname': first,
            'lastname': last,
            'email': test_email
        }
        res = client.post('/register', post_data)
        self.assertNotEqual(res.status_code, 200)
    
    def test_valid_user_login(self):
        """
        test users ability to login with valid credentials
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        test_user = 'test_user'
        test_pass = 'test_pass'
        test_email = 'test@test.com'
        first = 'test'
        last = 'user'

        post_data = {
            'username': test_user,
            'password1': test_pass,
            'password2': test_pass,
            'firstname': first,
            'lastname': last,
            'email': test_email
        }
        res = client.post('/register', post_data)
        self.assertEqual(res.status_code, 200)
        
        res = client.get('/login')
        self.assertEqual(res.status_code, 200)

        post_data['password'] = test_pass
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 200)
    
    def test_invalid_user_login(self):
        """
        Test rejection of invalid credentials
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        test_user = 'test_user'
        test_pass = 'test_pass'
        test_email = 'test@test.com'
        first = 'test'
        last = 'user'

        post_data = {
            'username': test_user,
            'password1': test_pass,
            'password2': test_pass,
            'firstname': first,
            'lastname': last,
            'email': test_email
        }
        res = client.post('/register', post_data)
        self.assertEqual(res.status_code, 200)

        res = client.get('/login')
        self.assertEqual(res.status_code, 200)

        post_data['password'] = 'IM A LITTLE TEA POT'
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 401)
    
    def test_valid_user_logout(self):
        """
        test users ability to logout
        """
        client = Client()
        res = client.get('/register')
        self.assertEqual(res.status_code, 200)

        test_user = 'test_user'
        test_pass = 'test_pass'
        test_email = 'test@test.com'
        first = 'test'
        last = 'user'

        post_data = {
            'username': test_user,
            'password1': test_pass,
            'password2': test_pass,
            'firstname': first,
            'lastname': last,
            'email': test_email
        }
        res = client.post('/register', post_data)
        self.assertEqual(res.status_code, 200)

        res = client.get('/login')
        self.assertEqual(res.status_code, 200)

        post_data['password'] = test_pass
        res = client.post('/login', post_data)
        self.assertEqual(res.status_code, 200)

        res = client.get('/logout')
        self.assertEqual(res.status_code, 200)
        self.assertFalse(res.context['request'].user.is_authenticated())
