from django.shortcuts import render
from django.http import HttpResponse
from maploco.models import Story

# Create your views here.

def index(request):
    return HttpResponse("Hello, world. Maploco index!")

def raw_stories(request):
    recent_stories_list = Story.objects.order_by('popularity')
    context = {'recent_stories_list': recent_stories_list}
    return render(request, 'raw_stories.html', context)
