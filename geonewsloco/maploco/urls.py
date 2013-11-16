from django.conf.urls import patterns, url

from maploco import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^raw_stories/$', views.raw_stories, name='rawstories'),
    url(r'^hello_world/$', views.hello_world, name='helloworld'),
)
