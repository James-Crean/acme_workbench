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
