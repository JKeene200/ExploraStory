from django.shortcuts import render

# Create your views here.

# Render the index page
def index(request):
    routes = [1, 2, 3]
    context = {
        'user_routes' : routes
        }
    return render(request, 'explorastory_app/index.html', context)

def login(request):
    return render(request, 'registration/login.html')