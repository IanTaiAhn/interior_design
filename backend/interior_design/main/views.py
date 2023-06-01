from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DataSerializer
from .models import TestData
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt


class DataViewSet(viewsets.ModelViewSet):
    queryset = TestData.objects.all()
    serializer_class = DataSerializer
# Create your views here.


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


# @csrf_protect
@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']
        # You can perform additional validations or checks on the uploaded image here

        # Specify the desired storage location for the uploaded image
        # For example, 'media/images/'
        save_location = 'media/images/' + uploaded_image.name

        # Save the uploaded image to the specified location
        with open(save_location, 'wb') as f:
            for chunk in uploaded_image.chunks():
                f.write(chunk)

        # Optionally, you can perform further processing or manipulation of the image using libraries like Pillow or OpenCV

        return JsonResponse({'message': 'Image uploaded successfully'})
    else:
        return JsonResponse({'error': 'No image file provided'}, status=400)
