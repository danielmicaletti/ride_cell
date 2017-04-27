# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from datetime import datetime, timedelta
import json
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from rest_framework import permissions, status, views, viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from parking.models import ParkingLot, SpotLocation
from reservations.models import SpotReservation
from reservations.serializers import SpotReservationSerializer


class SpotReservationViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = SpotReservation.objects.all()
    serializer_class = SpotReservationSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            try:
                parking_lot_id = self.request.data.get('parking_lot_id')
                res_end = self.request.data.get('spot_res_end')
                res_delta = datetime.now() + timedelta(hours=int(res_end))
                parking_lot = ParkingLot.objects.get(id=parking_lot_id)
                spot_location = SpotLocation.objects.filter(parking_lot=parking_lot, reservation_spot__isnull=True)
                serializer.save(spot_location=spot_location[0], spot_reservation_end=res_delta)
            except ObjectDoesNotExist as e:
                raise ObjectDoesNotExist(str(e))
        else:
            return Response({
                'status': 'Bad request',
                'message': 'Reservation could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)
