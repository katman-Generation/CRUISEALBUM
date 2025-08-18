from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from . import views


urlpatterns = [
    path('about/', views.about, name='about'),
    path('api/cities/', views.city_list),
    path('api/create-city/', views.create_city),
    path('api/create-post/', views.create_post),
    path('api/city/<int:id>/posts/', views.posts_by_city),
    path('api/posts/<int:id>/like/', views.like_post),
    path('api/download/<int:id>/', views.download_post_image),
    path('', views.explore, name='explore'),
    path('download-image/<int:image_id>/', views.download_image, name='download_image'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('index/<int:city_id>', views.index, name='index'),
    path('<int:post_id>', views.likes, name='likes'),
    path('createcity', views.uploadCity, name='uploadCity'),
    path('createpost', views.uploadPost, name='uploadPost'),
    path('testlog', views.testlog, name='testlog'),
    path('api/register/', views.register),
]

urlpatterns = urlpatterns+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

