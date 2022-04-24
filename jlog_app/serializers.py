from rest_framework import serializers
from .models import *



class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'name', 'count', "jiu_jitsu_id"]

class JiuJitsuSerializer(serializers.ModelSerializer):
    #adding serializer to add depth to submissions but not to user_id field
    submissions = SubmissionSerializer(many=True, read_only=True)
    class Meta:
        model = JiuJitsu
        fields = ["id", "user_id","name", "description", "duration", "rolls", "submissions"]

    