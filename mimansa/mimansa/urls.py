# from django.contrib import admin
# from django.urls import path, include, re_path
# from django.conf.urls.static import static
# from django.conf.urls import url
# from django.conf import settings
# from rest_framework import routers

# from packfromtote import views

# router = routers.SimpleRouter()
# router.register(r'warehouse', views.WarehouseViewSet, basename='Chat')
# # router.register(r'users', views.UserViewSet, basename='User')
# urlpatterns = router.urls
# urlpatterns += [
#     path('admin/', admin.site.urls),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

"""rpy_mimansa_apps URL Configuration
​
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from packfromtote.views import *
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Mimansa API",
      default_version='v1',
      description="Mimansa API",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.SimpleRouter()
router.register(r'api/warehouse', WarehouseViewSet, basename='Warehouse')
router.register(r'api/locnprintermap', LocnPrinterMapViewSet, basename='LocnPrinterMap')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

urlpatterns = urlpatterns + router.urls