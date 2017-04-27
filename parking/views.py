# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.contrib.gis.geos import GEOSGeometry, fromstr
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.http import HttpResponse
from rest_framework import generics, views, viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from parking.models import ParkingLot, SpotLocation
from parking.serializers import ParkingLotSerializer, SpotLocationSerializer


class ParkingLotViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            parking_lot_name = self.request.data.get('parking_lot_name', None)
            parking_lot_lat = self.request.data.get('parking_lot_lat', None)
            parking_lot_lng = self.request.data.get('parking_lot_lng', None)
            pnt = fromstr("POINT(%s %s)" % (parking_lot_lng, parking_lot_lat))
            serializer.save(parking_lot_location=pnt, parking_lot_name=parking_lot_name)
        else:
            return Response({
                'status': 'Bad request',
                'message': 'Parking Lot could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)


class ParkingLotRetrieveViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer

    def get_queryset(self):
        queryset = self.queryset
        qs_lat = self.request.query_params.get('lat', None)
        qs_lng = self.request.query_params.get('lng', None)
        qs_radius = self.request.query_params.get('radius', None)
        desired_radius = {'mi': float(qs_radius)}
        user_location = fromstr("POINT(%s %s)" % (qs_lng, qs_lat))
        if qs_lat and qs_lng and qs_radius:
            pnt = GEOSGeometry(user_location, srid=4326)
            qs = queryset.filter(
            parking_lot_location__distance_lte=(pnt, D(**desired_radius))).annotate(distance=Distance('parking_lot_location', pnt)).order_by('distance')

        return qs


class SpotLocationViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = SpotLocation.objects.all()
    serializer_class = SpotLocationSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            parking_lot_id = self.request.data.get('parking_lot', None)
            parking_lot = ParkingLot.objects.get(id=parking_lot_id)
            spot_lat = self.request.data.get('spot_lat', None)
            spot_lng = self.request.data.get('spot_lng', None)
            spot_number = self.request.data.get('spot_number', None)
            pnt = fromstr("POINT(%s %s)" % (spot_lng, spot_lat))
            serializer.save(parking_lot=parking_lot, spot_location=pnt, spot_number=spot_number)
        else:
            return Response({
                'status': 'Bad request',
                'message': 'Parking spot could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)
