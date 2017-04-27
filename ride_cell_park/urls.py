# -*- coding: utf-8 -*-
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth import views
from rest_framework import routers
from ride_cell_park.views import IndexView
from parking.views import ParkingLotViewSet, ParkingLotRetrieveViewSet, SpotLocationViewSet
from reservations.views import SpotReservationViewSet

router = routers.SimpleRouter()
router.register(r'parking-lot', ParkingLotViewSet)
router.register(r'parking-lot-locations', ParkingLotRetrieveViewSet)
router.register(r'spot-location', SpotLocationViewSet)
router.register(r'spot-reservation', SpotReservationViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^$',  IndexView.as_view(), name='index'),
]
