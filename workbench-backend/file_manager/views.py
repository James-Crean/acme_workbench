import json
import os
from shutil import rmtree

from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import DataFile, DataSet, DataType
from django.views.decorators.csrf import csrf_exempt
from local_settings import userdata_storage_path

def get_data_set_list(request):
    """
    Return a list of all data sets the requesting user has access to

    parameters:
        request (WSGIrequest)

    return:
        json encoded list of DataSet names
    """
    user = request.user
    if not user.is_authenticated():
        return HttpResponse(status=401)

    site_user = User.objects.get(username=user.username)
    data_sets = [{k: v for k,v in data_set.toDict().items()} for data_set in DataSet.objects.filter(allowed_access=site_user.id)]
    response = json.dumps(data_sets)
    return HttpResponse(response)

def get_data_set(request):
    """
    Gets all info about a given dataset

    parameters:
        request.GET['data_set'] (str) the name of the dataset to get the info for

    returns:
        json encoded DataSet
    """
    user = request.user
    if not user.is_authenticated():
        return HttpResponse(status=401)
    site_user = User.objects.get(username=user)

    try:
        data_set_name = request.GET['data_set_name']
    except Exception as e:
        return HttpResponse(status=402)

    try:
        data_set = DataSet.objects.get(allowed_access=site_user.id, name=data_set_name)
    except:
        return HttpResponse(json.dumps({}))
    response = json.dumps(data_set.toDict())
    return HttpResponse(response)

def get_file_info(request):
    user = request.user
    if not user.is_authenticated():
        return HttpResponse(status=401)
    site_user = User.objects.get(username=user)

    try:
        data_set_name = request.GET['data_set_name']
        data_file_name = request.GET['data_file_name']
    except Exception as e:
        return HttpResponse(status=402)

    data_set = None
    try:
        data_set = DataSet.objects.get(allowed_access=site_user.id, name=data_set_name)
    except:
        return HttpResponse(json.dumps({}))

    try:
        data_file = data_set.file_list.get(display_name=data_file_name)
    except:
        return HttpResponse(json.dumps({}))

    response = json.dumps(data_file.toDict())
    return HttpResponse(response)

# def get_node_list(request):
#     """
#     Return a list of known ESGF nodes
#     """
#     known_nodes = [
#         'pcmdi.llnl.gov',
#         'esgf-node.jpl.nasa.gov',
#         'esgf-index1.ceda.ac.uk',
#         'esgf-data.dkrz.de',
#         'esg-dn1.nsc.liu.se',
#         'esgf-node.ipsl.upmc.fr',
#         'esgf.nci.org.au'
#         'esg-dn1.nsc.liu.se',
#         'esgdata.gfdl.noaa.gov',
#         'esgf.nccs.nasa.gov',
#         'esg.ccs.ornl.gov'
#     ]
#     return HttpResponse(json.dumps(known_nodes))

@csrf_exempt
def upload_dataset(request, dataset_name):
    """
    Handles user upload for new data sets
    
    parameters:
        dataset_name (str)
        
    return:
        status 200 if success, else 401
    """
    if not request.method == "POST":
        return HttpResponse(status=401)
    if not request.user.is_authenticated():
        return HttpResponse(status=401)

    user = User.objects.get(username=request.user)
    try:
        dataset = DataSet.objects.get(
            name=dataset_name,
            owner=user)
    except:
        dataset = DataSet(
            name=dataset_name,
            owner=user)
        dataset.save()
        dataset.allowed_access.add(user)
    

    dataset_path = os.path.join(userdata_storage_path, dataset_name + '_' + user.username)
    if not os.path.exists(dataset_path):
        os.makedirs(dataset_path)

    for item in request.FILES.getlist('file'):
        path = os.path.join(dataset_path, str(item))
        name = str(item)
        with open(path, 'wb') as outfile:
            for chunk in item.chunks():
                outfile.write(chunk)

        data_type = DataType.TEXT.value
        if name[-3:] == 'xml':
            data_type = DataType.XML.value
        elif name[-4:] == 'json':
            data_type = DataType.JSON.value
        elif name[-2:] == 'nc':
            data_type = DataType.NETCDF.value
        elif name[-3:] == 'png':
            data_type = DataType.IMAGE.value

        new_file = DataFile(
            path=path,
            display_name=str(item),
            owner=user,
            data_type=int(data_type))
        new_file.save()
        new_file.allowed_access.add(user)
        dataset.file_list.add(new_file)
        dataset.save()

    return HttpResponse()

def delete_dataset(request, dataset_name):
    """
    Delete the database entry as well as the data
    
    parameters:
        dataset_name (str): the dataset to delete
    
    """
    if not request.method == 'DELETE':
        return HttpResponse(status=403)
    if not request.user.is_authenticated():
        return HttpResponse(status=403)
    
    user = User.objects.get(username=request.user)
    try:
        dataset = DataSet.objects.get(name=dataset_name)
    except:
        return HttpResponse(status=404)
    if not dataset.owner.id == user.id:
        return HttpResponse(status=403)

    datafiles = dataset.file_list.all()
    if not datafiles:
        dataset.delete()
        dataset.save()
        return HttpResponse()

    path = os.sep.join(datafiles[0].path.split(os.sep)[:-1])
    rmtree(path)

    for datafile in dataset.file_list.all():
        datafile.delete()
        datafile.save()
    dataset.delete()
    dataset.save()
    return HttpResponse()

def change_file_permissions(request):
    """
    If request method is POST, updates the permissions to add the new users
    If request method is DELETE, updates to remove permissions of given users

    parameters:
        user_list (list of strings): the list of users to adjust the permissions for
        file: the id of the file having its permissions altered

    return: 200 if success, else 401
    """
    # check the user logged in
    if not request.user.is_authenticated():
        return HttpResponse(status=401)
    # check the request is of the allowed types
    if request.method not in ['POST', 'DELETE']:
        return HttpResponse(status=401)

    # get the params we need
    try:
        data = json.loads(request.body)
        user_list = data['user_list']
        file = data['file']
    except Exception as e:
        return HttpResponse(status=401)
    # get the DataFile we're mutating
    try:
        dataFile = DataFile.objects.get(id=file)
    except Exception as e:
        return HttpResponse(status=401)
    # Check the requesting user is the datas owner
    request_user = User.objects.get(username=request.user)
    if not dataFile.owner.id == request_user.id:
        return HttpResponse(status=403)
    # perform the mutation
    for user in user_list:
        u = User.objects.get(username=user)
        if request.method == 'POST':
            dataFile.allowed_access.add(u)
        else:
            dataFile.allowed_access.remove(u)
    return HttpResponse()