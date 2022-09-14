from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView

# Create your views here.
def newNamaste(request):
	return HttpResponse("Hi, this is the first step of our web application.")


class IndexView(TemplateView):
	template_name = 'index.html'