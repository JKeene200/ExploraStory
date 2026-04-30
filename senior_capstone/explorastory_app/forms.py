from django import forms
from django.contrib import gis
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


# allows browsers to render date picker widget
class DateInput(forms.DateInput):
    input_type = 'date'

# form to create a new user
class RegistrationForm(UserCreationForm):
    # add additional fields
    email = forms.EmailField()

    # include Meta class
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]

# form for the addition of a route
class NewRouteForm(forms.Form):
    route_name = forms.CharField(max_length=100, label='Name of this route:')
    route_date = forms.DateField(widget=DateInput, label='Date this route was traveled:')
    route_data = gis.forms.LineStringField(widget=forms.HiddenInput())
    route_color = forms.CharField(label='Color to display this route with:', widget=forms.TextInput(attrs={'type': 'color'}))
    route_note = forms.CharField(widget=forms.Textarea(), label='Notes about the trip:')
    passengers = forms.CharField(label='Names of the people on the trip:')

# form to modify a route
class ModifyRouteForm(forms.Form):
    route_id = forms.IntegerField(widget=forms.HiddenInput())
    change_route_name = forms.CharField(max_length=100, label='Name:')
    change_route_date = forms.DateField(widget=DateInput, label='Date of trip:')
    change_route_color = forms.CharField(label='Display color:', widget=forms.TextInput(attrs={'type': 'color'}))
    change_route_note = forms.CharField(label='Note', widget=forms.Textarea())

# form to delete a route
class DeleteRouteForm(forms.Form):
    route_id = forms.IntegerField(widget=forms.HiddenInput(attrs={'id': 'delete_route_id'}))

# form to change the order of the routes
class ChangeRouteOrder(forms.Form):
    route_order = forms.CharField(widget=forms.HiddenInput())
    route_opacity = forms.CharField(widget=forms.HiddenInput())

