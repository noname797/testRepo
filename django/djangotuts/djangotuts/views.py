from curses.ascii import HT
from django.http import HttpResponse
from django.shortcuts import render
#we need to render a template in order to send it
# Before runnning it up we go to settings.py and the set DIRS. where django knows where our directories stored in 

def homepage(request):
    return render(request,'home.html')
     # return HttpResponse("homepage")

def about(request):
     # Creating a function which will execute when we run url pags
     # return HttpResponse("about")
     return render(request,'about.html') # Always looks in the tempalate folder
