from rest_framework import serializers
from .models import Utilisateur, RendezVous

class UtilisateurSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Utilisateur
        fields = ['id', 'nom', 'email', 'role', 'password', 'date_creation']
        read_only_fields = ['id', 'date_creation']

    def create(self, validated_data):
        """
        Création d’un utilisateur avec hash du mot de passe
        """
        password = validated_data.pop('password')
        user = Utilisateur(**validated_data)
        user.set_password(password)  # hash du mot de passe
        user.save()
        return user

    def update(self, instance, validated_data):
        """
        Mise à jour utilisateur avec gestion du mot de passe
        """
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)  # hash du nouveau mot de passe
        instance.save()
        return instance


class RendezVousSerializer(serializers.ModelSerializer):
    utilisateur = serializers.StringRelatedField(read_only=True)  # Affiche email ou nom
    utilisateur_id = serializers.PrimaryKeyRelatedField(
        source='utilisateur',
        queryset=Utilisateur.objects.all(),
        write_only=True
    )

    class Meta:
        model = RendezVous
        fields = [
            'id',
            'utilisateur', 'utilisateur_id',
            'titre',
            'description',
            'date_heure',
            'statut',
            'date_creation'
        ]
        read_only_fields = ['id', 'date_creation']
