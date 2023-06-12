import os
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework import viewsets
from PIL import Image, ImageFilter
from .serializers import DataSerializer
from .models import TestData
from django.views.decorators.csrf import ensure_csrf_cookie
# For testing


class DataViewSet(viewsets.ModelViewSet):
    queryset = TestData.objects.all()
    serializer_class = DataSerializer


def get_random_image(request):
    api_key = 'PO9vdDW0c5JsgnPJFaKQDGZ70fbEKbVV7XwyZMwya5I'
    url = 'https://api.unsplash.com/photos/random'
    headers = {
        'Authorization': f'Client-ID {api_key}'
    }
    params = {
        'query': 'nature'  # Modify the query to suit your needs
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Failed to fetch image'}, status=500)


def process_image(image_path, iterations):
    image = Image.open(image_path)
    for i in range(iterations):
        image = image.filter(ImageFilter.BLUR)
    image.save(image_path)
    return image


# @ensure_csrf_cookie
# @csrf_protect
@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']
        save_location = 'media/images/' + uploaded_image.name

        with open(save_location, 'wb') as f:
            for chunk in uploaded_image.chunks():
                f.write(chunk)

        processed_image = process_image(save_location, 4)

        response = HttpResponse(content_type="image/jpeg")
        processed_image.save(response, "JPEG")
        os.remove(save_location)
        return response
    else:
        return HttpResponse("Error: Upload failed", status=400)
