# Helper Methods for Main Application

def blah_blah_blah():
    return 42

def i_dont_give_a_fuck(start_date, end_date):
    """This function pulls all the fucking stories it can."""

    from urllib2 import urlopen
    from django.http import HttpResponse
    from django.utils import simplejson
    import json

    from maploco.models import Story

    for page in range(100):
        query = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a7da03c9051077bb4e69376735b38f87:4:67487784&sort=newest&begin_date=" + str(start_date) + "&end_date=" + str(end_date) + "&page=" + str(page) + "&hl=true"

        result = json.loads(urlopen(query).read())
        docs = result['response']['docs']

        for doc in docs:
            story = Story()
        
            if hasattr(doc, 'headline') and hasattr(doc['headline'], 'main'):
                story.headline = doc['headline']['main']

            if hasattr(doc, 'web_url'):
                story.url = doc['web_url']

            if hasattr(doc, 'snippet'):
                story.blurb = doc['snippet']

            if hasattr(doc, 'keywords'):
                for keyword in keywords:
                    if keyword.name == 'glocations':
                        story.location_description = keyword.value

            story.save()

    return "Done importing."
