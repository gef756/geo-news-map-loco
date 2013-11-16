# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):

        # Changing field 'Story.headline'
        db.alter_column(u'maploco_story', 'headline', self.gf('django.db.models.fields.CharField')(max_length=100, null=True))

        # Changing field 'Story.popularity'
        db.alter_column(u'maploco_story', 'popularity', self.gf('django.db.models.fields.IntegerField')(null=True))

        # Changing field 'Story.lon'
        db.alter_column(u'maploco_story', 'lon', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Story.url'
        db.alter_column(u'maploco_story', 'url', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Changing field 'Story.location_description'
        db.alter_column(u'maploco_story', 'location_description', self.gf('django.db.models.fields.CharField')(max_length=255, null=True))

        # Changing field 'Story.lat'
        db.alter_column(u'maploco_story', 'lat', self.gf('django.db.models.fields.FloatField')(null=True))

        # Changing field 'Story.blurb'
        db.alter_column(u'maploco_story', 'blurb', self.gf('django.db.models.fields.CharField')(max_length=1000, null=True))

    def backwards(self, orm):

        # Changing field 'Story.headline'
        db.alter_column(u'maploco_story', 'headline', self.gf('django.db.models.fields.CharField')(default='dummy', max_length=100))

        # Changing field 'Story.popularity'
        db.alter_column(u'maploco_story', 'popularity', self.gf('django.db.models.fields.IntegerField')(default=-1))

        # Changing field 'Story.lon'
        db.alter_column(u'maploco_story', 'lon', self.gf('django.db.models.fields.FloatField')(default=-1))

        # Changing field 'Story.url'
        db.alter_column(u'maploco_story', 'url', self.gf('django.db.models.fields.CharField')(default='dummy', max_length=255))

        # Changing field 'Story.location_description'
        db.alter_column(u'maploco_story', 'location_description', self.gf('django.db.models.fields.CharField')(default='dummy', max_length=255))

        # Changing field 'Story.lat'
        db.alter_column(u'maploco_story', 'lat', self.gf('django.db.models.fields.FloatField')(default=-1))

        # Changing field 'Story.blurb'
        db.alter_column(u'maploco_story', 'blurb', self.gf('django.db.models.fields.CharField')(default='dummy', max_length=1000))

    models = {
        u'maploco.story': {
            'Meta': {'object_name': 'Story'},
            'blurb': ('django.db.models.fields.CharField', [], {'max_length': '1000', 'null': 'True', 'blank': 'True'}),
            'headline': ('django.db.models.fields.CharField', [], {'max_length': '100', 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'lat': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'location_description': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'}),
            'lon': ('django.db.models.fields.FloatField', [], {'null': 'True', 'blank': 'True'}),
            'popularity': ('django.db.models.fields.IntegerField', [], {'null': 'True', 'blank': 'True'}),
            'url': ('django.db.models.fields.CharField', [], {'max_length': '255', 'null': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['maploco']
