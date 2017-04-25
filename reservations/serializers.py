# -*- coding: utf-8 -*-
import json
from rest_framework import serializers, status
from rest_framework.response import Response
from reservations.models import SpotReservation

class SpotReservationSerializer(serializers.ModelSerializer):
	spot_location = serializers.CharField(required=False)

	class Meta:
		model = SpotReservation
		fields = ('id', 'spot_location', 'spot_reservation_date', 'spot_reservation_start_time', 'spot_reservation_end_time',)

