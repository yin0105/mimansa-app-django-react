from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf.urls import url
from rest_framework import routers
from django.conf import settings

from . import views

router = routers.SimpleRouter()
router.register(r'warehouse', views.WarehouseViewSet, basename='Warehouse')
router.register(r'locnprintermap', views.LocnPrinterMapViewSet, basename='LocnPrinterMap')

# urlpatterns = [
#     # path('admin/', admin.site.urls),
#     # path('api/', include('packfromtote.urls')),
# ] 
urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + router.urls

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)