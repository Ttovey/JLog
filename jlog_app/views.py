from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse
from .models import JiuJitsu, Submission
from .serializers import JiuJitsuSerializer, SubmissionSerializer
from .views_auth import handle_login, handle_logout, handle_signup
from rest_framework import permissions
from django.views.decorators.csrf import csrf_exempt


def home(request):
    index = open('build/index.html').read()
    return HttpResponse(index)

class JiuJitsuViewSet(ModelViewSet):
    serializer_class = JiuJitsuSerializer
    
    def get_queryset(self):
        user = self.request.user
        return JiuJitsu.objects.filter(user_id=user)

class SubmissionViewSet(ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
