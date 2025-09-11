from django.urls import path
from .views import LoginView
from .views import register

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', register, name='register'),
]
