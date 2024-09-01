from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('about/', views.about, name='about'),
    path('', views.explore, name='explore'),
    path('download-image/<int:image_id>/', views.download_image, name='download_image'),
    path('index/<int:city_id>', views.index, name='index'),
    path('<int:post_id>', views.likes, name='likes'),
    path('createcity', views.uploadCity, name='uploadCity'),
    path('createpost', views.uploadPost, name='uploadPost'),
    path('testlog', views.testlog, name='testlog')
]

urlpatterns = urlpatterns+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

