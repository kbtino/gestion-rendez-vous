from django.contrib import admin

# Register your models here.
from .models import Utilisateur # 🔹 import du model Utilisateur
admin.site.register(Utilisateur) # 🔹 enregistrement du model Utilisateur dans l'admin