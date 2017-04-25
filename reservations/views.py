# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from rest_framework import permissions, status, views, viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from parking.models import SpotLocation
from reservations.models import SpotReservation
from reservations.serializers import SpotReservationSerializer


class SpotReservationViewSet(viewsets.ModelViewSet):

    lookup_field = 'id'
    queryset = SpotReservation.objects.all()
    serializer_class = SpotReservationSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            try:
                spot_location_id = self.request.data.get('spot_location_id')
                serializer.save(spot_location=SpotLocation.objects.get(id=spot_location_id), **self.request.data)
            except:
                print "NOT VALID SPOT LOCATION"
        else:
            return Response({
                'status': 'Bad request',
                'message': 'Reservation could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)
