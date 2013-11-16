from django.db import models

# Create your models here.

class Story(models.Model):
    headline             = models.CharField(max_length=100, null=True)
    url                  = models.CharField(max_length=255, null=True)
    lat                  = models.FloatField(null=True)
    lon                  = models.FloatField(null=True)
    location_description = models.CharField(max_length=255, null=True)
    popularity           = models.IntegerField(null=True)
    blurb                = models.CharField(max_length=1000, null=True)
