# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-26 00:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0002_parkinglot_parking_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='parkinglot',
            old_name='parking_location',
            new_name='parking_lot_location',
        ),
    ]
