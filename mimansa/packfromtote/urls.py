from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework import routers

from . import views

router = routers.SimpleRouter()
router.register(r'warehouse', views.WarehouseViewSet, basename='Warehouse')
router.register(r'locnprintermap', views.LocnPrinterMapViewSet, basename='LocnPrinterMap')

# # -*- coding: utf-8 -*-
# from django.conf.urls import url

# from . import views


# urlpatterns = [
#     url(r"^Warehouse$", view=views.WarehouseListView.as_view(), name="index"),
#     url(r"^Warehouse/(?P<code>[\d\-]+)/$", view=views.WarehouseDetailView.as_view(), name="detail"),
#     url(r"^Warehouse/create/$", view=views.WarehouseCreateView.as_view(), name="create"),
#     url(
#         r"^Warehouse/update/(?P<code>[\d\-]+)/$",
#         view=views.WarehouseUpdateView.as_view(),
#         name="update",
#     ),
#     url(
#         r"^Warehouse/delete/(?P<code>[\d\-]+)/$",
#         view=views.WarehouseDeleteView.as_view(),
#         name="delete",
#     ),
# ]
