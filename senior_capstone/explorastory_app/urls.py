from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path("", auth_views.LoginView.as_view(template_name='registration/login.html'), name="login"),
    path("password_reset", auth_views.PasswordResetView.as_view(template_name='registration/password_reset.html'), name="explorastory/password_reset"),
    path("create_profile", views.create_profile, name="explorastory/create_profile"),
    path("index", views.index, name="index")
]