# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Story'
        db.create_table(u'maploco_story', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('headline', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('url', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('lat', self.gf('django.db.models.fields.FloatField')()),
            ('lon', self.gf('django.db.models.fields.FloatField')()),
            ('location_description', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('popularity', self.gf('django.db.models.fields.IntegerField')()),
        ))
        db.send_create_signal(u'maploco', ['Story'])


    def backwards(self, orm):
        # Deleting model 'Story'
        db.delete_table(u'maploco_story')


    models = {
        u'maploco.story': {
            'Meta': {'object_name': 'Story'},
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