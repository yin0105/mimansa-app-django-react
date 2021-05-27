from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from . import models
from . import serializers


class WarehouseViewSet(ModelViewSet):    
    serializer_class = serializers.WarehouseSerializer
    
    def list(self, request):
        queryset = models.Warehouse.objects.all()
        serializer = serializers.WarehouseSerializer(queryset, many=True)
        return Response(serializer.data)


class LocnPrinterMapViewSet(ModelViewSet):    
    serializer_class = serializers.LocnPrinterMapSerializer

    def list(self, request):
        queryset = models.LocnPrinterMap.objects.all()
        serializer = serializers.LocnPrinterMapSerializer(queryset, many=True)
        return Response(serializer.data)


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