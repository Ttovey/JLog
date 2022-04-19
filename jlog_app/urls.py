from django.urls import path 
from . import views


urlpatterns = [
    path('', views.home),
    path('jlog_api/logout/', views.handle_logout),
    path('jlog_api/login/', views.handle_login)
]