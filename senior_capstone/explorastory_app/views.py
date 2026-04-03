from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Route, Passenger
from django.contrib.gis.geos import LineString
from django.core.serializers import serialize

from .forms import NewRouteForm

import json

# Create your views here.

# Render the index page
@login_required
def index(request):

    current_user = request.user
    routes = Route.objects.filter(user=current_user)
    route_data = json.loads(serialize('geojson', routes))

    # for post requests, process the form
    if request.method == "POST":
        form = NewRouteForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            creator = current_user
            name = form.cleaned_data["route_name"]
            date = form.cleaned_data["route_date"]
            data = form.cleaned_data["route_data"]
            color = form.cleaned_data["route_color"]
            layer = (routes.count() + 1)
            visible = True
            note = form.cleaned_data["route_note"]
            passengers = form.cleaned_data["passengers"].split(',')

            # create route with the provided data
            new_route = Route(user=creator, route_name=name, route_date=date, route_data=data, route_color=color, route_layer=layer, route_visible=visible, route_note=note)
            new_route.save()
            # add passengers to the new route
            for passenger in passengers:
                new_passenger = Passenger(route=new_route, passenger_name=passenger)
                new_passenger.save()

            # reload the page:
            return HttpResponseRedirect("index")

    # for non-post requests, pass empty form
    else:
        form = NewRouteForm()

    
    context = {
        'user_routes' : routes,
        'render_data' : route_data,
        'username' : current_user,
        'form' : form,
    }
    
    return render(request, 'explorastory_app/index.html', context)

def login(request):
    return render(request, 'registration/login.html')
