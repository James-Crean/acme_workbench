import json
from django.test import TestCase
from django.test import Client

from local_settings import userdata_storage_path

class FileManagerViewTests(TestCase):
    """
    Tests for the Index app views
    """
    fixtures = ['seed.json']

    def test_get_data_set_list(self):
        """
        Test '/file_manager/get_data_set_list/'
        """
        expected_result = [{
            "file_list": ['query1.txt', 'query2.txt', 'test_query.sh'],
            "allowed_access": ["test_user"],
            "name": "test_user_data",
            "owner": "test_user",
            "metadata": ""
        }]
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set_list/')
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.content)
        self.assertTrue(data == expected_result)
    
    def test_get_data_set_list_invalid(self):
        """
        Test that get_data_set_list returns status=401 when unauthenicated
        """
        client = Client()
        res = client.get('/file_manager/get_data_set_list/')
        self.assertEqual(res.status_code, 401)

    def test_get_data_set(self):
        """
        test '/file_manager/get_data_set/'
        """
        expected_result = {
            "file_list": ['query1.txt', 'query2.txt', 'test_query.sh'],
            "allowed_access": ["test_user"],
            "owner": "test_user",
            "name": "test_user_data",
            "metadata": ""
        }
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set/', {'data_set_name': 'test_user_data'})
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.content)
        print data, expected_result
        self.assertTrue(data == expected_result)
    
    def test_get_data_set_fake_data_set(self):
        """
        test '/file_manager/get_data_set/'
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set/', {'data_set_name': 'DOES_NOT_EXIST'})
        self.assertEqual(res.status_code, 200)

        data = json.loads(res.content)
        self.assertTrue(data == {})
    
    def test_get_data_set_invalid(self):
        """
        test file_manager.get_data_set return status=401 when unauthenticated
        """
        client = Client()
        res = client.get('/file_manager/get_data_set/')
        self.assertEqual(res.status_code, 401)
    
    def test_get_data_set_bad_set(self):
        """
        test file_manager.get_data_set returns status=402 when asking for a bad dataset
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        res = client.get('/file_manager/get_data_set/', {})
        self.assertEqual(res.status_code, 402)

    def test_get_file_info(self):
        """
        test file_manager.get_file_info
        """
        expected_result = {
            'owner': 'test_user',
            'path': '/Users/baldwin32/projects/acme_workbench/userdata/test_user_data_test_user/query1.txt',
            'display_name': 'query1.txt',
            'data_type': 2,
            'allowed_access': ['test_user']
        }
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        params = {
            'data_set_name': 'test_user_data',
            'data_file_name': 'query1.txt'
        }
        res = client.get('/file_manager/get_file_info/', params)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.content)
        self.assertTrue(data == expected_result)
    
    def test_get_file_info_fake_file(self):
        """
        test file_manager.get_file_info
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        params = {
            'data_set_name': 'test_user_data',
            'data_file_name': 'DOES_NOT_EXIST'
        }
        res = client.get('/file_manager/get_file_info/', params)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.content)
        self.assertTrue(data == {})
    
    def test_get_file_info_unauthenticated(self):
        """
        test file_manager.get_file_info return 401 with unauthenticated request
        """
        client = Client()
        res = client.get('/file_manager/get_file_info/')
        self.assertEqual(res.status_code, 401)
    
    def test_get_file_info_no_dataset(self):
        """
        test file_manager.get_file_info
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')

        params = {
            'data_set_name': 'DOES_NOT_EXIST',
            'data_file_name': 'query1.txt'
        }
        res = client.get('/file_manager/get_file_info/', params)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.content)
        self.assertTrue(data == {})

    def test_get_file_info_bad_request(self):
        """
        Test that file_manager.get_file_info returns 402 on bad request
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')
        res = client.get('/file_manager/get_file_info/', {})
        self.assertEqual(res.status_code, 402)

    def test_upload_dataset_wrong_method(self):
        """
        test file_manager.upload_dataset responds with status=401 without a POST request
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')
        res = client.get('/file_manager/upload_dataset/TEST')
        self.assertEqual(res.status_code, 401)
    
    def test_upload_dataset_unauthenticated(self):
        """
        test file_manager.upload_dataset responds with status=401 without an authenticated user
        """
        client = Client()
        res = client.post('/file_manager/upload_dataset/TEST')
        self.assertEqual(res.status_code, 401)
    
    def test_upload_dataset(self):
        """
        test file_manager.upload_dataset accepts valid file upload
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')
        
        dataset_name = 'new_test_dataset'
        url = '/file_manager/upload_dataset/' + dataset_name
        with open('seed.json', 'r') as filepointer:
            res = client.post(url, {'file': filepointer})
            self.assertEqual(res.status_code, 200)
        if res.status_code == 200:
            res = client.delete('/file_manager/delete_dataset/' + dataset_name)

    def test_delete_dataset_unauthenticated(self):
        """
        test file_manager.delete_dataset rejects unauthenticated requests
        """
        client = Client()
        res = client.delete('/file_manager/delete_dataset/TEST')
        self.assertEqual(res.status_code, 403)
    
    def test_delete_dataset_wrong_method(self):
        """
        test file_manager.delete_dataset rejects unauthenticated requests
        """
        client = Client()
        res = client.get('/file_manager/delete_dataset/TEST')
        self.assertEqual(res.status_code, 403)
        
    def test_delete_dataset_no_dataset(self):
        """
        test file_manager.delete_dataset rejects unauthenticated requests
        """
        client = Client()
        res = client.get('/file_manager/delete_dataset/')
        self.assertEqual(res.status_code, 404)
    
    def test_delete_dataset_bad_dataset(self):
        """
        test file_manager.delete_dataset rejects unauthenticated requests
        """
        client = Client()
        client.login(
            username='test_user',
            password='qwertyuiop')
        res = client.delete('/file_manager/delete_dataset/TEST')
        self.assertEqual(res.status_code, 404)