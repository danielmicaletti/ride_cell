# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-26 00:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ParkingLot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('parking_lot_lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('parking_lot_lng', models.DecimalField(decimal_places=6, max_digits=9)),
                ('parking_lot_name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SpotLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spot_location_lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('spot_location_lng', models.DecimalField(decimal_places=6, max_digits=9)),
                ('spot_number', models.CharField(blank=True, max_length=50, null=True)),
                ('parking_lot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='parking_spot_lot', to='parking.ParkingLot')),
            ],
        ),
    ]
