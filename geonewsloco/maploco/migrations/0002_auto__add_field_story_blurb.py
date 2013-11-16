# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Story.blurb'
        db.add_column(u'maploco_story', 'blurb',
                      self.gf('django.db.models.fields.CharField')(default='blurb', max_length=1000),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Story.blurb'
        db.delete_column(u'maploco_story', 'blurb')


    models = {
        u'maploco.story': {
            'Meta': {'object_name': 'Story'},
            'blurb': ('django.db.models.fields.CharField', [], {'max_length': '1000'}),
            'headline': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {}),
            'location_description': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'lon': ('django.db.models.fields.FloatField', [], {}),
            'popularity': ('django.db.models.fields.IntegerField', [], {}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        }
    }

    complete_apps = ['maploco']