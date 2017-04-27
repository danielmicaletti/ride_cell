# -*- coding: utf-8 -*-
import json
from rest_framework import serializers, status
from rest_framework.response import Response
from reservations.models import SpotReservation

class SpotReservationSerializer(serializers.ModelSerializer):
	spot_location = serializers.CharField(required=False)
	spot_reservation_start = serializers.DateTimeField(required=False)
	spot_reservation_end = serializers.DateTimeField(required=False)

	class Meta:
		model = SpotReservation
		fields = ('id', 'spot_location', 'spot_reservation_start', 'spot_reservation_end',)

