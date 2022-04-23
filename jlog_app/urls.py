from django.urls import path, include 
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('jiujitsu', views.JiuJitsuViewSet, basename='jiujitsu')
router.register('submission', views.SubmissionViewSet, basename='submission')

urlpatterns = [
    path('', views.home),
    path('jlog_api/', include(router.urls)),
    path('jlog_api/sign_up/', views.handle_signup),
    path('jlog_api/logout/', views.handle_logout),
    path('jlog_api/login/', views.handle_login)
]