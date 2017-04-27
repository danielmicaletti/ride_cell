# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-26 10:07
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0003_auto_20170425_1757'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='parkinglot',
            name='parking_lot_lat',
        ),
        migrations.RemoveField(
            model_name='parkinglot',
            name='parking_lot_lng',
        ),
        migrations.RemoveField(
            model_name='spotlocation',
            name='spot_location_lat',
        ),
        migrations.RemoveField(
            model_name='spotlocation',
            name='spot_location_lng',
        ),
        migrations.AddField(
            model_name='spotlocation',
            name='spot_location',
            field=django.contrib.gis.db.models.fields.PointField(blank=True, null=True, srid=4326),
        ),
    ]