from django.db import models

# Create your models here.

class Story(models.Model):
    headline             = models.CharField(max_length=100)
    url                  = models.CharField(max_length=255)
    lat                  = models.FloatField(blank=True)
    lon                  = models.FloatField(blank=True)
    location_description = models.CharField(blank=True, max_length=255)
    popularity           = models.IntegerField(blank=True)
    blurb                = models.CharField(blank=True, max_length=1000)
