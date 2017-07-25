from django.shortcuts import render, render_to_response
from django.template import RequestContext, loader
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from index.forms import UserCreationForm
from index.models import Notification
from django.views.decorators.csrf import csrf_protect


# Create your views here.
def index(request):
    return render(request, 'index.html')

# Login
@csrf_protect
def user_login(request):
    context = RequestContext(request)

    if request.method == 'POST':
        user = authenticate(
            username=request.POST['username'], password=request.POST['password'])
        if user:
            if user.is_active:
                login(request, user)
                messages.success(
                    request, 'User: ' + request.POST['username'] + ' successfully loged in')
                return HttpResponseRedirect('/')
            else:
                messages.error(
                    request, 'User: ' + request.POST['username'] + ' is a disactivated account')
                return HttpResponseRedirect('login')
        else:
            messages.error(request, "Username or password incorrect")
            return HttpResponseRedirect('login')
    else:
        if 'next' in request.GET:
            redirect = request.GET.get('next')

        else:
            redirect = ''
        return render(request, "login.html", {"next": redirect})
        

# Logout
def user_logout(request):
    logout(request)
    messages.success(request, 'Log out successful')
    return render(request, "index.html", {'logout': 'success    '})

# Register new user
def user_register(request):
    context = RequestContext(request)
    registered = False
    if request.method == 'POST':
        user_form = UserCreationForm(data=request.POST)
        username = request.POST['username']
        if user_form.is_valid():
            user = user_form.save()
            try:
                group = Group.objects.get(name="Default")
                user.groups.add(group)
            except Group.DoesNotExist:
                # Don't do anything, no default set up
                pass

            user.save()
            registered = True
            user = authenticate(
                username=request.POST['username'], password=request.POST['password1'])
            if user:
                login(request, user)
                message = 'User: {} created an account and logged in'.format(username)
                messages.success(request, message)
                #setup_output_directories(username)
                note = Notification(user=str(request.user), notification_list='')
                try:
                    note.save()
                except Exception, e:
                    raise
        else:
            print user_form.errors
    else:
        user_form = UserCreationForm()

    data = {
        "user_form": user_form,
        "registered": registered
    }
    return render(request, "register.html", data)



#Helper Functions
def render_template(request, template, context):
    template = loader.get_template(template)
    context = RequestContext(request, context)
    return template.render(context)
