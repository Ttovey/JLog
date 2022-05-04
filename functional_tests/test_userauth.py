from selenium import webdriver
from django.test import SimpleTestCase
import time



class TestUserAuth(SimpleTestCase):

    def setUp(self):
        self.browser = webdriver.Chrome('functional_tests/chromedriver')

    def tearDown(self):
        self.browser.close()

    def test_user_signup(self):
        #Open Webpage
        self.browser.get('http://127.0.0.1:8000/#/')
        
        #Access Sign Up button then navigate to Sign Up Page
        signup = self.browser.find_element_by_link_text('Sign Up')
        signup.click()


        