from django.urls import path
from . import views

urlpatterns = [
    path('', views.newNamaste, name = "Hello"),
    path('index', views.IndexView.as_view(), name = "Index"),
]