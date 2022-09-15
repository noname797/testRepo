
from django.urls import path
from . import views

urlpatterns = [
    # When user inputs the URL then the funciton which is to be called is modified here
    path(r'', views.article_list),




]
