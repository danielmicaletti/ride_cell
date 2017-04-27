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

    list_display = ('id', 'parking_lot_name', 'parking_lot_location')
    list_filter = ('id', 'parking_lot_name', 'parking_lot_location')
    ordering = ('id',)

admin.site.register(ParkingLot, ParkingLotAdmin)

class SpotLocationAdmin(admin.ModelAdmin):

    class Meta:
        model = SpotLocation

    list_display = ('id', 'parking_lot', 'spot_location', 'spot_number')
    list_filter = ('id', 'parking_lot', 'spot_location', 'spot_number')
    ordering = ('id',)

admin.site.register(SpotLocation, SpotLocationAdmin)