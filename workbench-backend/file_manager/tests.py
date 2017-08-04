import json
from django.test import TestCase
from django.test import Client


class FileManagerViewTests(TestCase):
    """
    Tests for the Index app views
    """
    fixtures = ['seed.json']

    def test_data_set_list(self):
        """
        Test '/file_manager/get_data_set_list/'
        """
        expected_result = [{
            "file_list": ["dummy_1", "dummy_2"],
            "allowed_access": ["test_user"],
            "name": "dummy set",
            "metadata": "This is a dummy data set"
        }]
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set_list/')
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.content)
        self.assertTrue(data == expected_result)

    def test_get_data_set(self):
        """
        test '/file_manager/get_data_set/'
        """
        expected_result = {
            "file_list": ["dummy_1", "dummy_2"],
            "allowed_access": ["test_user"],
            "name": "dummy set",
            "metadata": "This is a dummy data set"
        }
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set/', {'data_set_name': 'dummy set'})
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.content)
        self.assertTrue(data == expected_result)

    def test_get_file_info(self):
        """
        test '/file_manager/get_file_info/
        """
        expected_result = {
            'owner': 'test_user',
            'path': '/some/path/dummy_1.nc',
            'display_name': 'dummy_1',
            'data_type': 1,
            'allowed_access': ['test_user']
        }
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        params = {
            'data_set_name': 'dummy set',
            'data_file_name': 'dummy_1'
        }
        res = client.get('/file_manager/get_file_info/', params)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.content)
        self.assertTrue(data == expected_result)
