from django import forms
from django.contrib import gis

# allows browsers to render date picker widget
class DateInput(forms.DateInput):
    input_type = 'date'

# form for the addition of a route
class NewRouteForm(forms.Form):
    route_name = forms.CharField(max_length=100, label='The name of this route:')
    route_date = forms.DateField(widget=DateInput, label='The date this route was traveled:')
    route_data = gis.forms.LineStringField(widget=forms.HiddenInput())
    route_color = forms.CharField(label='The color to display this route with:', widget=forms.TextInput(attrs={'type': 'color'}))
    route_note = forms.CharField(widget=forms.Textarea(), label='Notes about the trip:')
    passengers = forms.CharField(label='Names of the people on the trip:')
