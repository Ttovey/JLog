import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from jlog_app.models import JiuJitsu, StrengthTraining, User
from jlog_app.serializers import JiuJitsuSerializer, StrengthTrainingSerializer

client = Client()

class TestJiuJitsu(TestCase):
    
    def setUp(self):
        user = User.objects.create(username='Test_USER', password='Test12345')
        client.force_login(user)

        JiuJitsu.objects.create(
            name='Test Jiu Jitsu',
            description='Test me baby',
            user_id=user,
            duration=60,
            rolls=6,
        )

        JiuJitsu.objects.create(
            name='Test Jiu Jitsu 2',
            description='Test me baby',
            user_id=user,
            duration=60,
            rolls=5,
        )

    def test_get_all_jiujitsu(self):
        response = client.get(reverse('jiujitsu-list'))
        all_jiujitsu = JiuJitsu.objects.order_by('-date')
        serializer = JiuJitsuSerializer(all_jiujitsu, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_detail_jiujitsu(self):
        response = client.get(reverse('jiujitsu-detail', args=[2]))
        detail_jiujitsu = JiuJitsu.objects.get(id=2)
        serializer = JiuJitsuSerializer(detail_jiujitsu)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_jiujitsu(self):
        data = json.dumps({'name': 'Update Name'})
        response = client.patch(reverse('jiujitsu-detail', args=[2]), data, content_type='application/json')
        detail_jiujitsu = JiuJitsu.objects.get(id=2)
        self.assertEqual(response.data['name'], detail_jiujitsu.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_jiujitsu(self):
        response = client.delete(reverse('jiujitsu-detail', args=[1]))
        try:
            deleted_jiujitsu = JiuJitsu.objects.get(id=1)
        except JiuJitsu.DoesNotExist:
            deleted_jiujitsu = None
        
        self.assertEqual(deleted_jiujitsu, None)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class TestStrengthTraining(TestCase):
    
    def setUp(self):
        user = User.objects.create(username='Test_USER', password='Test12345')
        client.force_login(user)

        StrengthTraining.objects.create(
            name='Test Strength Training',
            description='Test me baby',
            user_id=user,
            duration=60,
        )

        StrengthTraining.objects.create(
            name='Test Strength Training 2',
            description='Test me baby',
            user_id=user,
            duration=60,
        )

    def test_get_all_strengthtraining(self):
        response = client.get(reverse('strengthtraining-list'))
        all_strengthtraining = StrengthTraining.objects.order_by('-date')
        serializer = StrengthTrainingSerializer(all_strengthtraining, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_detail_strengthtraining(self):
        response = client.get(reverse('strengthtraining-detail', args=[2]))
        detail_strengthtraining = StrengthTraining.objects.get(id=2)
        serializer = StrengthTrainingSerializer(detail_strengthtraining)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_strengthtraining(self):
        data = json.dumps({'name': 'Update Name'})
        response = client.patch(reverse('strengthtraining-detail', args=[2]), data, content_type='application/json')
        detail_strengthtraining = StrengthTraining.objects.get(id=2)
        self.assertEqual(response.data['name'], detail_strengthtraining.name)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_strengthtraining(self):
        response = client.delete(reverse('strengthtraining-detail', args=[1]))
        try:
            deleted_strengthtraining = StrengthTraining.objects.get(id=1)
        except StrengthTraining.DoesNotExist:
            deleted_strengthtraining = None
        
        self.assertEqual(deleted_strengthtraining, None)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)