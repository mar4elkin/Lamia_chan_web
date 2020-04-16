from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from django.conf.urls        import include, url
from django.conf             import settings
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [    
    url(r'^api/v1/docs/', schema_view),
    path('core/', include('core.urls')),
    path('admin/', admin.site.urls),
    url(r'^api/v1/', include('api.urls')),
    #url(r'^api/user/', include('drf_user.urls')),
    
]

if not settings.DOCKER:
    urlpatterns += static(settings.MEDIA_URL,  document_root=settings.MEDIA_ROOT )