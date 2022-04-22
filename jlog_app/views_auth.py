import json
from django.http.response import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from .models import User

def error_on_request(error_msg):
    return JsonResponse({ "error": error_msg }, status=400)

def bad_request():
    return error_on_request("bad request")

@csrf_exempt
def handle_login(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            
            username = data.get("username")
            password = data.get("password")

            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return JsonResponse(data={ "user": user.username, 'userId': user.id }, status=200)
    
    except Exception as e:
        return error_on_request(str(e))

    
    return bad_request()

@csrf_exempt
def handle_logout(request):
    try:
        if request.method == "POST":
            logout(request)
            return JsonResponse(data={ "status": "logged out successfully!"}, status=200)
    
    except Exception as e:
        return error_on_request(str(e))

    
    return bad_request()

@csrf_exempt
def handle_signup(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
            username = data['username']
            password = data['password']
            User.objects.create_user(username=username, password=password)
    except Exception as e:
        return error_on_request(str(e))
    return HttpResponse('User Created.')
