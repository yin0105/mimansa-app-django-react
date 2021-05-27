from rest_framework import serializers
from . import models

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Warehouse
        fields = '__all__'

class LocnPrinterMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LocnPrinterMap
        fields = '__all__'

   