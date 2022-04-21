from django.shortcuts import render
from django.http import HttpResponse
from .views_auth import handle_login, handle_logout, handle_signup


def home(request):
    index = open('build/index.html').read()
    return HttpResponse(index)