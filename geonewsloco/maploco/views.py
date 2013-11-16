from django.shortcuts import render
from django.http import HttpResponse
from maploco.models import Story
from maploco.utils import *

# Create your views here.

def index(request):
    recent_stories_list = Story.objects.order_by('popularity')
    context = {'recent_stories_list': recent_stories_list}
    return render(request, 'gmaps.html', context)

def hello_world(request):
    return HttpResponse("Hello, world. Maploco index! The answer " + 
        "to life, the universe, and everything is: " + 
        str(blah_blah_blah()))

def raw_stories(request):
    recent_stories_list = Story.objects.order_by('popularity')
    context = {'recent_stories_list': recent_stories_list}
    return render(request, 'raw_stories.html', context)

def gmaps_test(request):
    recent_stories_list = Story.objects.order_by('popularity')
    context = {'recent_stories_list': recent_stories_list}
    return render(request, 'gmaps_test.js', context)
