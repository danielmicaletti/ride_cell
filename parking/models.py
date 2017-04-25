# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from django.utils.encoding import smart_unicode

class ParkingLot(models.Model):
    
    parking_lot_lat = models.DecimalField(max_digits=9, decimal_places=6)
    parking_lot_lng = models.DecimalField(max_digits=9, decimal_places=6)
    parking_lot_name = models.CharField(max_length=50)

    def __unicode__(self):
        return smart_unicode(self.parking_lot_name)

class SpotLocation(models.Model):

    parking_lot = models.ForeignKey(ParkingLot, related_name="parking_spot_lot")
    spot_location_lat = models.DecimalField(max_digits=9, decimal_places=6)
    spot_location_lng = models.DecimalField(max_digits=9, decimal_places=6)
    spot_number = models.CharField(max_length=50, null=True, blank=True)

    def __unicode__(self):
        return smart_unicode(self.id)
