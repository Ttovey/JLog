from django.db import models
from django.contrib.auth.models import User

class Activity(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(null=True, blank=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.IntegerField(null=True, blank=True)

class JiuJitsu(Activity):
    rolls = models.IntegerField