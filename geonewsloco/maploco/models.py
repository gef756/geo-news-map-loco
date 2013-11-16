from django.db import models

# Create your models here.

class Story(models.Model):
    headline = models.CharField(max_length=100)
    url = models.CharField(max_length=255)
    lat = models.FloatField()
    lon = models.FloatField()
    location_description = models.CharField(max_length=255)
    popularity = models.IntegerField()
    blurb = models.CharField(max_length=1000)
