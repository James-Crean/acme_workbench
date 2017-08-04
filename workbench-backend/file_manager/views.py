import json

from django.http import HttpResponse
from django.contrib.auth.models import User
from .models import DataFile, DataSet, DataType

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

    data_set = DataSet.objects.filter(allowed_access=site_user.id)
    if not data_set:
        return HttpResponse(json.dumps({}))
    response = json.dumps(data_set[0].toDict())
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

    data_set = DataSet.objects.get(allowed_access=site_user.id, name=data_set_name)
    if not data_set:
        return HttpResponse(json.dumps({}))

    data_file = data_set.file_list.get(display_name=data_file_name)
    if not data_file:
        return HttpResponse(json.dumps({}))

    response = json.dumps(data_file.toDict())
    return HttpResponse(response)

def get_node_list(request):
    """
    Return a list of known ESGF nodes
    """
    known_nodes = [
        'pcmdi.llnl.gov',
        'esgf-node.jpl.nasa.gov',
        'esgf-index1.ceda.ac.uk',
        'esgf-data.dkrz.de',
        'esg-dn1.nsc.liu.se',
        'esgf-node.ipsl.upmc.fr',
        'esgf.nci.org.au'
        'esg-dn1.nsc.liu.se',
        'esgdata.gfdl.noaa.gov',
        'esgf.nccs.nasa.gov',
        'esg.ccs.ornl.gov'
    ]
    return HttpResponse(json.dumps(known_nodes))