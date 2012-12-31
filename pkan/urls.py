from django.conf.urls.defaults import patterns, include, url

urlpatterns = patterns('',
    url(r'^$', 'pkan.pkanapp.views.index'),
    url(r'^update/', 'pkan.pkanapp.views.update'),
    url(r'^delete/', 'pkan.pkanapp.views.delete'),
    url(r'^add/', 'pkan.pkanapp.views.add'),
)
