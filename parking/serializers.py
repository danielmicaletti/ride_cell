# -*- coding: utf-8 -*-
import json
from rest_framework import serializers, status
from rest_framework.response import Response
from parking.models import ParkingLot, SpotLocation

class ParkingLotSerializer(serializers.ModelSerializer):

	class Meta:
		model = ParkingLot
		fields = ('id', 'parking_lot_lat', 'parking_lot_lng', 'parking_lot_name',)

class SpotLocationSerializer(serializers.ModelSerializer):

	class Meta:
		model = SpotLocation
		fields = ('id', 'parking_lot', 'spot_location_lat', 'spot_location_lng',)
