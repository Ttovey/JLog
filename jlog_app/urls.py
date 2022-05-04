from django.urls import path, include 
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register('jiujitsu', views.JiuJitsuViewSet, basename='jiujitsu')
router.register('submission', views.SubmissionViewSet, basename='submission')
router.register('strengthtraining', views.StrengthTrainingViewSet, basename='strengthtraining')
router.register('set', views.SetViewSet, basename='set')

urlpatterns = [
    path('', views.home, name='home'),
    path('jlog_api/', include(router.urls)),
    path('jlog_api/sign_up/', views.handle_signup, name='signup'),
    path('jlog_api/logout/', views.handle_logout, name='logout'),
    path('jlog_api/login/', views.handle_login, name='login')
]