# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib import admin
from reservations.models import SpotReservation

class SpotReservationAdmin(admin.ModelAdmin):

    class Meta:
        model = SpotReservation

    list_display = ('id', 'spot_location', 'spot_reservation_date', 'spot_reservation_start_time', 'spot_reservation_end_time',)
    list_filter = ('id', 'spot_location', 'spot_reservation_date', 'spot_reservation_start_time', 'spot_reservation_end_time',)
    ordering = ('-spot_reservation_date',)

admin.site.register(SpotReservation, SpotReservationAdmin)