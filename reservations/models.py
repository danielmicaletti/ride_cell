# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from time import time
from django.db import models
from django.utils.encoding import smart_unicode
from parking.models import SpotLocation

class SpotReservation(models.Model):

    spot_location = models.ForeignKey(SpotLocation, related_name='reservation_spot')
    spot_reservation_date = models.DateField()
    spot_reservation_start_time = models.TimeField()
    spot_reservation_end_time = models.TimeField()

    def __unicode__(self):
        return smart_unicode(self.id)

