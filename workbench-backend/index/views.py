from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

# Login
@csrf_exempt
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
                return HttpResponseRedirect('/acme')
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
        response = HttpResponse(
            render_template(request, "web_fe/login.html", {"next": redirect}))
        return response

# Logout
def user_logout(request):
    logout(request)
    messages.success(request, 'Log out successful')
    return HttpResponse(render_template(request, "web_fe/home.html", {'logout': 'success    '}))

# Register new user
@csrf_exempt
def register(request):
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
                setup_output_directories(username)
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
    return render_to_response("web_fe/register.html", data, context)
