from django.urls import path
from .views import LoginView, RendezVousListView, register, RendezVousCreateView, CreateUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', register, name='register'),
    path('rendezvous/', RendezVousListView.as_view(), name='rendezvous-list'),  # ajout de la route pour lister les rendez-vous
    path('rendezvous/create/', RendezVousCreateView.as_view(), name='rendezvous-create'),  # ajout de la route pour créer un rendez-vous
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/create/', CreateUserView.as_view(), name='user-create'),  # Route pour créer un utilisateur
]
