# Helper Methods for Main Application

from urllib2 import urlopen
from django.http import HttpResponse
from django.utils import simplejson
import json
from django.utils.html import escape
from string import replace
from django.core import serializers

from maploco.models import Story

def blah_blah_blah():
    return 42

def clearmydb():
    Story.objects.all().delete()
    return "Done deleting stories."

def i_dont_give_a_fuck(start_date, end_date, num_pages):
    """This function pulls all the fucking stories it can."""
    for page in range(num_pages):
        query = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7da03c9051077bb4e69376735b38f87:4:67487784&sort=newest&begin_date=" + str(start_date) + "&end_date=" + str(end_date) + "&page=" + str(page) + "&hl=true"

        result = json.loads(urlopen(query).read())
        docs = result['response']['docs']

        for doc in docs:
            story = Story()

            if 'headline' in doc and 'main' in doc['headline']:
                story.headline = doc['headline']['main']

            if 'web_url' in doc:
                story.url = doc['web_url']

            if 'snippet' in doc:
                story.blurb = doc['snippet']

            if 'keywords' in doc:
                for keyword in doc['keywords']:
                    if keyword['name'] == 'glocations':
                        story.location_description = keyword['value']

            story.save()

    return "Done importing."

def fill_lat_long_help():
    for story in Story.objects.all().exclude(location_description__isnull=True):
        query = "http://maps.googleapis.com/maps/api/geocode/json?address=" +       escape(replace(replace(replace(story.location_description, ')', ''), '(', ''),' ','+')) + "&sensor=false" 
        print(query)
        result = json.loads(urlopen(query).read())
        # print(result['results'][0]['geometry'])
        if len(result['results']) != 0:
            story.lat = float(result['results'][0]['geometry']['location']['lat'])
            story.lon = float(result['results'][0]['geometry']['location']['lng'])
            story.save()
        else:
            print("No location found for: " + str(story.location_description))
    return "Done loading lat longs."

def json_stories(latmin, latmax, lngmin, lngmax):
    all_stories = Story.objects.all().filter(lat__gte=latmin, lat__lte=latmax, 
               lon__gte=lngmin, lon__lte=lngmax)
    if len(all_stories) == 0:
        res = ""
    else:
        res = serializers.serialize("json", all_stories)
    return res
    
