# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status, permissions
# from rest_framework_simplejwt.tokens import RefreshToken
# from django.contrib.auth import authenticate
# from .models import Utilisateur
# from .serializers import UtilisateurSerializer


# class LoginView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         email = request.data.get('email')
#         password = request.data.get('password')

#         user = authenticate(request, email=email, password=password)

#         if user is not None:
#             refresh = RefreshToken.for_user(user)
#             serializer = UtilisateurSerializer(user)
#             return Response({
#                 'user': serializer.data,
#                 'refresh': str(refresh),
#                 'access': str(refresh.access_token),
#             })
#         else:
#             return Response({'error': 'Email ou mot de passe incorrect'},
#                             status=status.HTTP_401_UNAUTHORIZED)

# users/views.py

from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Utilisateur
from .serializers import UtilisateurSerializer

# -----------------------------
# Vue pour la connexion (login)
# -----------------------------
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]  # Accessible sans authentification

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authentification de l'utilisateur
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Génération des tokens JWT
            refresh = RefreshToken.for_user(user)
            serializer = UtilisateurSerializer(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response(
                {'error': 'Email ou mot de passe incorrect'},
                status=status.HTTP_401_UNAUTHORIZED
            )

# -----------------------------
# Vue pour l'inscription (register)
# -----------------------------
@api_view(['POST'])
@permission_classes([AllowAny])  # Accessible sans authentification
def register(request):
    try:
        email = request.data.get('email')
        nom = request.data.get('nom')
        password = request.data.get('password')
        role = request.data.get('role', 'user')  # par défaut 'user'

        # Vérification des champs obligatoires
        if not email or not password or not nom:
            return Response(
                {"error": "Tous les champs sont obligatoires"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Vérification que l'email n'existe pas déjà
        if Utilisateur.objects.filter(email=email).exists():
            return Response(
                {"error": "Cet email est déjà utilisé"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Création de l'utilisateur avec mot de passe hashé
        user = Utilisateur.objects.create_user(
            email=email,
            nom=nom,
            password=password,
            role=role
        )

        return Response(
            {
                "message": "Utilisateur créé avec succès",
                "user": {
                    "email": user.email,
                    "nom": user.nom,
                    "role": user.role
                }
            },
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
