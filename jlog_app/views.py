from django.db.models.base import ModelBase
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse
from .models import JiuJitsu, StrengthTraining, Submission, Set
from .serializers import JiuJitsuSerializer, SetSerializer, SubmissionSerializer, StrengthTrainingSerializer
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
        queryset = JiuJitsu.objects.filter(user_id=user).order_by('-date')
        return queryset

class SubmissionViewSet(ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

class StrengthTrainingViewSet(ModelViewSet):
    serializer_class = StrengthTrainingSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = StrengthTraining.objects.filter(user_id=user).order_by('-date')
        return queryset

class SetViewSet(ModelViewSet):
    queryset = Set.objects.all()
    serializer_class = SetSerializer
