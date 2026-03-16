from django.db import models
from django.contrib.gis.db import models as gis_models
from django.contrib.auth.models import User

# Create your models here.

# The Route model
class Route(models.Model):
    route_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    route_name = models.CharField(max_length=100)
    route_date = models.DateField()
    route_data = gis_models.LineStringField(geography=True)
    route_color = models.CharField(max_length=7)
    route_layer = models.IntegerField()
    route_visible = models.BooleanField(default=True)
    route_note = models.TextField()

    # returns a string about the object
    def __str__():
        return ('%s, traveled on %s by %s' % ({self.route_name}, {self.route_date}, {self.user}))

# The Passenger model
class Passenger(models.Model):
    passenger_id = models.AutoField(primary_key=True)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    passenger_name = models.CharField(max_length=50)

    # returns a string about the object
    def __str__():
        return ('{self.route_name}')
    
