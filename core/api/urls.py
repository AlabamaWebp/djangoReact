from django.urls import path
# from rest_framework import routers
from rest_framework.routers import DefaultRouter

from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)
# router = routers.DefaultRouter()
# router.register()
# from .viewsets import PublicationViewSet

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(),
         name='token_verify'),
    path('blacklist/',
      LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('u/', UserApi.as_view(), name="user"),
    path('u/c', CustomUserCreate.as_view(), name="create_user"),
    path('p/', PubApi.as_view(), name="pub"),
    path('p/<int:pk>', PubApiDelete.as_view(), name="pubpk"),
    # path('e/', EdApi.as_view(), name="ed"),
    # path('h/', HisApi.as_view(), name="his"),
]

# router = DefaultRouter()
# router.register(r'pubserch', PublicationViewSet)
# urlpatterns += router.urls
