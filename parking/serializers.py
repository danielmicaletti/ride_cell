# -*- coding: utf-8 -*-
import json
from django.utils import timezone
from rest_framework import serializers, status
from rest_framework.response import Response
from parking.models import ParkingLot, SpotLocation
from reservations.models import SpotReservation
from reservations.serializers import SpotReservationSerializer
from ride_cell_park.utils import getPointLatLng


class ParkingLotSerializer(serializers.ModelSerializer):
	distance = serializers.DecimalField(source='distance.mi', max_digits=10, decimal_places=2, required=False, read_only=True)
	parking_lot_location = serializers.SerializerMethodField()
	parking_spot_availability = serializers.SerializerMethodField()

	class Meta:
		model = ParkingLot
		fields = ('id', 'parking_lot_location', 'parking_lot_name', 'distance', 'parking_spot_availability')

	def get_parking_lot_location(self, obj):
		return (obj.parking_lot_location[1], obj.parking_lot_location[0]) 

	def get_parking_spot_availability(self, obj):
		total_spots = obj.parking_spot_location.all().count()
		parking_lot = ParkingLot.objects.get(id=obj.id)
		spots_avail = SpotReservation.objects.filter(spot_location__parking_lot=obj, spot_reservation_end__gt=timezone.now()).count()
		return {'parking_spot_avail': total_spots-spots_avail, 'parking_spot_total':total_spots}


class SpotLocationSerializer(serializers.ModelSerializer):
	parking_lot = serializers.CharField(required=False)
	reservation_spot = SpotReservationSerializer(required=False, many=True)

	class Meta:
		model = SpotLocation
		fields = ('id', 'parking_lot', 'spot_location', 'spot_number', 'reservation_spot')
