from django.db import models

# Create your models here.

class Story(models.Model):
    headline             = models.CharField(max_length=100, blank=True,
                                            null=True)
    url                  = models.CharField(max_length=255, blank=True,
                                            null=True)
    lat                  = models.FloatField(blank=True, null=True)
    lon                  = models.FloatField(blank=True, null=True)
    location_description = models.CharField(max_length=255, blank=True,
                                            null=True)
    popularity           = models.IntegerField(blank=True, null=True)
    blurb                = models.CharField(max_length=1000, blank=True,
                                            null=True)
