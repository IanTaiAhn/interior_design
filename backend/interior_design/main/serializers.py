from rest_framework import serializers
from .models import TestData


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestData
        fields = ['id', 'name', 'description']
