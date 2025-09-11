from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Manager pour le User personnalisé
class UtilisateurManager(BaseUserManager):
    def create_user(self, email, nom, password=None, role='user'):
        if not email:
            raise ValueError('Email requis')
        email = self.normalize_email(email)
        user = self.model(email=email, nom=nom, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nom, password=None):
        user = self.create_user(email, nom, password, role='admin')
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# User personnalisé
class Utilisateur(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (('user','User'), ('admin','Admin'))
    email = models.EmailField(unique=True)
    nom = models.CharField(max_length=100)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    date_creation = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UtilisateurManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nom']

    def __str__(self):
        return self.email

