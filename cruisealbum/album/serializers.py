from rest_framework import serializers
from .models import City, Post  # Adjust model names if different

class CitySerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = City
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Post
        fields = '__all__'
