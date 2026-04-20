from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Route, Passenger
from django.contrib.gis.geos import LineString
from django.core.serializers import serialize

from .forms import NewRouteForm, ModifyRouteForm, DeleteRouteForm

import json

# Create your views here.

# Render the index page
@login_required
def index(request):

    current_user = request.user
    routes = Route.objects.filter(user=current_user).order_by('route_layer')
    route_data = json.loads(serialize('geojson', routes))

    # for post requests, process the form
    if request.method == "POST":
        form_new = NewRouteForm(request.POST)
        modify_form = ModifyRouteForm(request.POST)
        delete_form = DeleteRouteForm(request.POST)

        # validate the correct form!
        if 'submit-new-route' in request.POST:
            # check whether it's valid:
            if form_new.is_valid():
                # process the data in form.cleaned_data as required
                creator = current_user
                name = form_new.cleaned_data["route_name"]
                date = form_new.cleaned_data["route_date"]
                data = form_new.cleaned_data["route_data"]
                color = form_new.cleaned_data["route_color"]
                layer = (routes.count() + 1)
                visible = True
                note = form_new.cleaned_data["route_note"]
                passengers = form_new.cleaned_data["passengers"].split(',')

                # create route with the provided data
                new_route = Route(user=creator, route_name=name, route_date=date, route_data=data, route_color=color, route_layer=layer, route_visible=visible, route_note=note)
                new_route.save()
                # add passengers to the new route
                for passenger in passengers:
                    new_passenger = Passenger(route=new_route, passenger_name=passenger)
                    new_passenger.save()

                # reload the page:
                return HttpResponseRedirect("index")
            
        elif 'submit-route-modification' in request.POST:
            # check whether it's valid:
            if modify_form.is_valid():
                route = modify_form.cleaned_data["route_id"]
                new_name = modify_form.cleaned_data["change_route_name"]
                new_date = modify_form.cleaned_data["change_route_date"]
                new_color = modify_form.cleaned_data["change_route_color"]
                new_note = modify_form.cleaned_data["change_route_note"]

                # verify that the user actually created the route they want to update
                modify_route_check = Route.objects.filter(route_id=route, user=current_user)
                if modify_route_check.count() == 1:
                    # update the route with the new data.
                    modify_route = Route(route_id= route, route_name=new_name, route_date=new_date, route_color=new_color, route_note=new_note)
                    modify_route.save(update_fields=["route_name", "route_date", "route_color", "route_note"])

                return HttpResponseRedirect("index")
            
        elif 'submit-route-delete' in request.POST:
            # check whether it's valid:
            if delete_form.is_valid():
                route = delete_form.cleaned_data["route_id"]
                # verify that the user actually created the route they want to delete
                delete_route_check = Route.objects.filter(route_id=route, user=current_user)
                if delete_route_check.count() == 1:
                    # delete the route
                    delete_route_check.delete()
                return HttpResponseRedirect("index")

    # for non-post requests, pass empty form
    else:
        form_new = NewRouteForm()
        modify_form = ModifyRouteForm()
        delete_form = DeleteRouteForm()
    
    context = {
        'user_routes' : routes,
        'render_data' : route_data,
        'username' : current_user,
        'form_new' : form_new,
        'modify_form': modify_form,
        'delete_form': delete_form
    }
    
    return render(request, 'explorastory_app/index.html', context)

def login(request):
    return render(request, 'registration/login.html')
