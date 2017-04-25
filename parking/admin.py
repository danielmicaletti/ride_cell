# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from parking.models import ParkingLot, SpotLocation

class SpotLocationInLine(admin.StackedInline):

    model = SpotLocation
    extra = 0

class ParkingLotAdmin(admin.ModelAdmin):

    inlines = [
        SpotLocationInLine,
    ]

    class Meta:
        model = ParkingLot

    list_display = ('id', 'parking_lot_name', 'parking_lot_lat', 'parking_lot_lng',)
    list_filter = ('id', 'parking_lot_name', 'parking_lot_lat', 'parking_lot_lng',)
    ordering = ('id',)

admin.site.register(ParkingLot, ParkingLotAdmin)

class SpotLocationAdmin(admin.ModelAdmin):

    class Meta:
        model = SpotLocation

    list_display = ('id', 'parking_lot', 'spot_location_lat', 'spot_location_lng',)
    list_filter = ('id', 'parking_lot', 'spot_location_lat', 'spot_location_lng',)
    ordering = ('id',)

admin.site.register(SpotLocation, SpotLocationAdmin)