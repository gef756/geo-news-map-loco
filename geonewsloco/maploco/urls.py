from django.conf.urls import patterns, url

from maploco import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    url(r'^raw_stories/$', views.raw_stories, name='rawstories'),
    url(r'^lol/$', views.lol, name='lol'),
    url(r'^lolz/$', views.fill_latlongs, name='fill_latlongs'),
    url(r'^delpop/$', views.delpop, name='delpop'),
    url(r'^hello_world/$', views.hello_world, name='helloworld'),
    url(r'^gmaps_test.js', views.gmaps_test, name='gmaps_test'),
    url(r'^scripts/gmaps.js', views.gmaps_js, name='gmapsjs'),
    url(r'^story/(?P<story_id>\d+)/$', views.story_detail, name='story_detail'),
    url(r'^stories/$', views.stories, name='stories'),
)
