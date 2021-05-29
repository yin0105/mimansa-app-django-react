import json

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http.response import HttpResponse
# from django.contrib.auth.models import User
from django.db.models import Q
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic import CreateView, TemplateView

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from . import models, serializers
from rest_framework.decorators import api_view
from django import core
from datetime import datetime
import pytz
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import Group
from django.forms.models import model_to_dict
from collections import OrderedDict

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from .models import Warehouse, LocnPrinterMap
from .serializers import WarehouseSerializer, LocnPrinterMapSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class WarehouseView(APIView):
    def put(self, request, format=None):
        print("request = ", request)
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get(self, request, *args, **kwargs):
        if "code" in request.GET:
            data = Warehouse.objects.filter(code=request.GET.get("code"))
        else:
            data = Warehouse.objects.all()
        serializer = WarehouseSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        warehouse_serializer = WarehouseSerializer(data=request.data)
        code = request.data["code"]

        if len(Warehouse.objects.filter(code=code)) > 0:
            return HttpResponse(status=status.HTTP_409_CONFLICT)
        
        if warehouse_serializer.is_valid():
            warehouse_serializer.save()
            return HttpResponse (WarehouseSerializer.data)
        else:
            print('error', WarehouseSerializer.errors)
            return HttpResponse (WarehouseSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class IndexView(LoginRequiredMixin, TemplateView):
#     login_url = reverse_lazy('login')
#     redirect_field_name = 'redirect_to'
#     template_name = 'index.html'

#     def get_context_data(self, **kwargs):
#         context = super(IndexView, self).get_context_data(**kwargs)
#         # user = User.objects.filter(id=self.request.GET.get("user_id")).first()
#         # chat = user.chat_set.all()
#         # if not chat:
#         #     context['chat'] = 0
#         # else:
#         #     context['chat'] = chat[0].id
#         return context

# class WarehouseViewSet(ModelViewSet): 
#     queryset = models.Warehouse.objects.all()
#     serializer_class = serializers.serializers.WarehouseSerializer
#     lookup_field = 'code'
#     lookup_url_kwarg = 'code'

#     def create(self, validated_data):
#         address_data = validated_data.pop('adresse')
#         address = Adresse.objects.create(**address_data)
#         organism = Organisme.objects.create(address=address, **validated_data)
#         return organism 

    
    
#     # def list(self, request):
#     #     print("warehouseviewset")  
#     #     queryset = models.Warehouse.objects.all()    
#     #     serializer = serializers.serializers.WarehouseSerializer(queryset)
#     #     return Response(serializer.data)


# class LocnPrinterMapViewSet(ModelViewSet):    
#     serializer_class = serializers.LocnPrinterMapSerializer
#     queryset = models.LocnPrinterMap.objects.all()

    # def list(self, request):
        
    #     serializer = serializers.LocnPrinterMapSerializer(queryset, many=True)
    #     return Response(serializer.data)


# from rest_framework import generics



# class ListTodo(generics.ListCreateAPIView):
#     queryset = models.Todo.objects.all()
#     serializer_class = TodoSerializer


# class DetailTodo(generics.RetrieveUpdateDestroyAPIView):
#     queryset = models.Todo.objects.all()
#     serializer_class = TodoSerializer



# from django.http.response import HttpResponse
# from django.views.generic import (
#     ListView,
#     DetailView,
#     CreateView,
#     UpdateView,
#     DeleteView,
# )
# from django.contrib import messages
# from django.shortcuts import redirect
# from django.http import Http404
# from django.urls import reverse_lazy
# from rest_framework.response import Response
# from django import forms
# from django.http import HttpResponse
# from datetime import datetime
# from django.shortcuts import render
# from django.core.exceptions import ValidationError
# from .models import Warehouse


# class WarehouseListView(ListView):
#     model = Warehouse

#     def get_queryset(self):
#         return Warehouse.objects.all()


# class WarehouseDetailView(DetailView):
#     model = Warehouse
#     slug_field = 'code'
#     slug_url_kwarg = 'code'

#     def get_queryset(self):
#         return Warehouse.objects.filter(code=self.kwargs.get('code'))


# class WarehouseCreateView(CreateView):
#     model = Warehouse
#     fields = ('code', 'name', 'rut', 'addr_line_1', 'addr_line_2', 'locality', 'city', 'state', 'zipcode', 'phone', 'logo')
#     template_name = 'Warehouses/Warehouse_form.html'
#     context_object_name = 'Warehouse'
#     slug_field = 'code'
#     slug_url_kwarg = 'code'

#     def get_queryset(self):
#         return Warehouse.objects.filter(code=self.kwargs.get('code'))

#     def form_valid(self, form):
#         messages.success(self.request, "The Warehouse created successfully")
#         return super().form_valid(form)

#     def form_invalid(self, form):
#         messages.error(self.request, "The creation has failed")
#         return super().form_invalid(form)


# class WarehouseUpdateView(UpdateView):
#     model = Warehouse
#     fields = ('code', 'name', 'rut', 'addr_line_1', 'addr_line_2', 'locality', 'city', 'state', 'zipcode', 'phone', 'logo')
#     template_name = 'Warehouses/Warehouse_form.html'
#     context_object_name = 'Warehouse'
#     slug_field = 'code'
#     slug_url_kwarg = 'code'

#     def get_queryset(self):        
#         return Warehouse.objects.filter(code=self.kwargs.get('code'))

#     def form_valid(self, form):
#         messages.success(self.request, "The Warehouse updated successfully")
#         return super().form_valid(form)

#     def form_invalid(self, form):
#         messages.error(self.request, "The update has failed")
#         return super().form_invalid(form)


# class WarehouseDeleteView(DeleteView):
#     model = Warehouse
#     fields = ('code', 'name', 'rut', 'addr_line_1', 'addr_line_2', 'locality', 'city', 'state', 'zipcode', 'phone', 'logo')
#     template_name = 'Warehouses/Warehouse_confirm_delete.html'
#     context_object_name = 'Warehouse'
#     slug_field = 'code'
#     slug_url_kwarg = 'code'
#     success_url = "/Warehouses/" 

#     def get_queryset(self):
#         messages.error(self.request, "The Warehouse deleted successfully")
#         return Warehouse.objects.filter(code=self.kwargs.get('code'))