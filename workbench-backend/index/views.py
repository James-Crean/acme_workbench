from django.shortcuts import render, render_to_response
from django.template import RequestContext, loader
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from index.forms import UserCreationForm
from index.models import Notification
from django.views.decorators.csrf import csrf_protect
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.
def index(request):
    return render(request, 'index.html')

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
                note = Notification(
                    user=str(request.user),
                    notification_list='')
                try:
                    note.save()
                except Exception, e:
                    raise
        else:
            return render(request, "register.html", {'error': user_form.errors}, status=422)
    else:
        user_form = UserCreationForm()

    data = {
        "user_form": user_form,
        "registered": registered
    }
    return render(request, "register.html", data)
