from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager, PermissionsMixin

# Manager pour le User personnalisé
class UtilisateurManager(BaseUserManager):
    def create_user(self, email, nom, password=None, role='user', **extra_fields):
        """
        Crée et retourne un utilisateur avec email, nom et mot de passe.
        """
        if not email:
            raise ValueError('L’adresse email est obligatoire')
        if not nom:
            raise ValueError('Le nom est obligatoire')

        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', False)

        user = self.model(email=email, nom=nom, role=role, **extra_fields)
        user.set_password(password)  # Hash du mot de passe
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nom, password=None, **extra_fields):
        """
        Crée et retourne un superutilisateur (admin).
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Le superutilisateur doit avoir is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Le superutilisateur doit avoir is_superuser=True')

        return self.create_user(email, nom, password, role='admin', **extra_fields)


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

# Model pour les rendez-vous
class RendezVous(models.Model):
    STATUT_CHOIES = [('prévu','Prévu'), 
        ('annulé','Annulé'), 
        ('terminé','Terminé')
    ]

    utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='rendezvous')
    titre = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    date_heure = models.DateTimeField()
    nom_client = models.CharField(max_length=150, null=True, blank=True)
    contact_client = models.CharField(max_length=30, null=True, blank=True)
    statut = models.CharField(max_length=10, choices=STATUT_CHOIES, default='prévu')
    date_creation = models.DateTimeField(auto_now_add=True)
     
    def __str__(self):
        return f"{self.titre} - {self.utilisateur.email} - {self.date_heure}"