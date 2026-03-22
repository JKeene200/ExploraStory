from django.shortcuts import render

# Create your views here.

# Render the index page
def index(request):
    routes = []
    current_user = request.user
    context = {
        'user_routes' : routes,
        'username' : current_user,
        }
    return render(request, 'explorastory_app/index.html', context)

def login(request):
    return render(request, 'registration/login.html')