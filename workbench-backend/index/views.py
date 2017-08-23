import json

from django.shortcuts import render, redirect
from django.template import RequestContext, loader
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group, User
from index.forms import UserCreationForm
from django.views.decorators.csrf import csrf_protect
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings

from requests_oauthlib import OAuth2Session
from OpenSSL import crypto

from local_settings import certificate_url, client_id, secret, redirect_url, authorize_url, token_url, globus_client_id

def index(request):
    return render(request, 'index.html')
 
def workbench(request):
    if request.user.is_authenticated():
        return render(request, 'workbench.html')
    else:
        return redirect('login/', status=302)

def get_token(request):
    scope = [certificate_url]

    if 'oauth_state' in request.session:
        del request.session['oauth_state']
    slcs = OAuth2Session(
        client_id=client_id,
        redirect_uri=redirect_url,
        scope=scope)
    auth_url, state = slcs.authorization_url(authorize_url)
    request.session['oauth_state'] = state
    return redirect(auth_url)

def oauth_callback(request):
    if 'oauth_state' not in request.session:
        return redirect('get_token')
    slcs = OAuth2Session(
        client_id=client_id,
        redirect_uri=redirect_url,
        state=request.session.pop('oauth_state'))
    token = slcs.fetch_token(
        token_url,
        client_secret=secret,
        authorization_response=request.url,
        verify = False)
    request.session['oauth_token'] = token
    return redirect('workbench')

# Login
@csrf_protect
def user_login(request):
    """
    Handle user login
    """
    context = RequestContext(request)

    if request.method == 'POST':
        user = authenticate(
            username=request.POST['username'],
            password=request.POST['password'])
        if not user:
            messages.error(request, "Username or password incorrect")
            return render(request, 'login.html', status=401)

        if user.is_active:
            login(request, user)
            msg = 'User: {user} successfully loged in'.format(
                user=request.POST['username'])
            messages.success(request, msg)
            return render(request, 'index.html')
        else:
            msg = 'User: {user} is a deactivated account'.format(
                user=request.POST['username'])
            messages.success(request, msg)
            return render(request, 'login.html', status=401)

    else:
        if 'next' in request.GET:
            redirect = request.GET.get('next')
        else:
            redirect = ''
        return render(request, "login.html", {"next": redirect})

# Logout
def user_logout(request):
    """
    Handle user logout
    """
    logout(request)
    messages.success(request, 'Log out successful')
    return render(request, "index.html", {'logout': 'success'})

# Register new user
def user_register(request):
    """
    Handle user registration
    """
    registered = False
    if request.method == 'POST':
        user_form = UserCreationForm(data=request.POST)
        username = request.POST['username']
        if user_form.is_valid():
            user = user_form.save()
            try:
                group = Group.objects.get(name="Default")
                user.groups.add(group)
            except ObjectDoesNotExist as dne:
                group = Group(name="Default")
                group.save()

                group = Group.objects.get(name="Default")
                user.groups.add(group)

            user.save()
            registered = True
            user = authenticate(
                username=request.POST['username'],
                password=request.POST['password1'])
            if user:
                login(request, user)
                message = 'User: {user} created an account and logged in'.format(
                    user=username)
                messages.success(request, message)
        else:
            return render(request, "register.html", {'user_form':user_form, 'error': user_form.errors}, status=422)
    else:
        user_form = UserCreationForm()

    data = {
        "user_form": user_form,
        "registered": registered
    }
    return render(request, "register.html", data)

def get_user_list(request):
    """
    Returns a list of all users
    """
    users = [ user.username for user in User.objects.all()]
    return HttpResponse(json.dumps(users))