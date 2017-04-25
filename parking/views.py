# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from rest_framework import permissions, status, views, viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.response import Response
from parking.models import ParkingLot, SpotLocation
from parking.serializers import ParkingLotSerializer, SpotLocationSerializer


class ParkingLotViewSet(viewsets.ModelViewSet):

	lookup_field = 'id'
	queryset = ParkingLot.objects.all()
	serializer_class = ParkingLotSerializer


class SpotLocationViewSet(viewsets.ModelViewSet):

	lookup_field = 'id'
	queryset = SpotLocation.objects.all()
	serializer_class = SpotLocationSerializer
