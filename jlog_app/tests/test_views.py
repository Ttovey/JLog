import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse

from jlog_app.models import JiuJitsu, User
from jlog_app.serializers import JiuJitsuSerializer

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