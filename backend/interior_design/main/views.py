import requests
from django.shortcuts import render
from django.http import JsonResponse
from django.http import FileResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from rest_framework import viewsets
from PIL import Image, ImageFilter
from .serializers import DataSerializer
from .models import TestData

# For testing


class DataViewSet(viewsets.ModelViewSet):
    queryset = TestData.objects.all()
    serializer_class = DataSerializer


def process_image(image_path):
    image = Image.open(image_path)
    # call api here and do some stuff,
    # for now we will blur it out.
    return image.filter(ImageFilter.BLUR)


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

# TODO make it so that the csrf tags work properly


# @csrf_protect
@csrf_exempt
def upload_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']

        save_location = 'media/images/' + uploaded_image.name

        # Save the uploaded image to the specified location
        with open(save_location, 'wb') as f:
            for chunk in uploaded_image.chunks():
                f.write(chunk)

        # Optionally, you can perform further processing or manipulation of the image using libraries like Pillow or OpenCV

        return JsonResponse({'message': 'Image uploaded successfully'})
    else:
        return JsonResponse({'error': 'No image file provided'}, status=400)


# def get_processed_image(request, image_id):
#     # The request needs to have the name of the image...
#     # I imagine we have a load time where the image gets processed.
#     # once it is done we give a button for the user to click which sends the photo back.
#     # Once it has sent back we will delete it from our mdeia folder.

#     # Open the image file and create a FileResponse
#     img_file_path = 'media/images/'
#     image_file = open(image_path, 'rb')
#     response = FileResponse(image_file)

    return response
