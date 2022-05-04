from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

class Activity(models.Model):
    name = models.CharField(max_length=32)
    description = models.TextField(blank=True, null=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.IntegerField(default=0)
    date = models.DateTimeField(default=now)

    class Meta:
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'

    def __str__(self):
        return f'{self.name}'


class JiuJitsu(Activity):
    rolls = models.IntegerField()

    class Meta:
        verbose_name = 'Jiu Jitsu'
        verbose_name_plural = 'Jiu Jitsu'

    def __str__(self):
        return f'{self.name}'

class Submission(models.Model):
    name = models.CharField(max_length=32)
    count = models.IntegerField(default=1)
    jiu_jitsu_id = models.ForeignKey(JiuJitsu, on_delete=models.CASCADE, related_name='submissions')

    class Meta:
        verbose_name = 'Submission'
        verbose_name_plural = 'Submissions'

    def __str__(self):
        return f'{self.name} : {self.count}'

class StrengthTraining(Activity):
    pass

    class Meta:
        verbose_name = 'Strength Training'
        verbose_name_plural = 'Strength Trainings'

    def __str__(self):
        return f'{self.name}'

class Set(models.Model):
    name = models.CharField(max_length=32)
    count = models.IntegerField(default=1)
    reps = models.IntegerField(default=1)
    weight = models.IntegerField(default=0)
    strength_id = models.ForeignKey(StrengthTraining, on_delete=models.CASCADE, related_name='sets')


    