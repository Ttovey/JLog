from django.test import SimpleTestCase
from django.urls import reverse, resolve
from .. import views

class TestUrls(SimpleTestCase):

    def test_base_url_is_resolved(self):
        url = reverse('home')
        self.assertEquals(resolve(url).func, views.home)

    def test_logout_url_is_resolved(self):
        url = reverse('logout')
        self.assertEquals(resolve(url).func, views.handle_logout)

    def test_login_url_is_resolved(self):
        url = reverse('login')
        self.assertEquals(resolve(url).func, views.handle_login)

    def test_signup_url_is_resolved(self):
        url = reverse('signup')
        self.assertEquals(resolve(url).func, views.handle_signup)