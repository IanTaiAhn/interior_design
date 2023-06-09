import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
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


def process_image(image_path, iterations):
    image = Image.open(image_path)
    for i in range(iterations):
        image = image.filter(ImageFilter.BLUR)
    return image


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
        request.session['image_path'] = save_location

        with open(save_location, 'wb') as f:
            for chunk in uploaded_image.chunks():
                f.write(chunk)

        process_image(save_location, 4).save(save_location)
        return JsonResponse({'message': 'Image uploaded successfully'})
    else:
        return JsonResponse({'error': 'No image file provided'}, status=400)


@csrf_exempt
def download_image(request):
    if request.method == 'GET':
        image_path = request.session.get('image_path')
        with open(image_path, 'rb') as image_file:
            image_data = image_file.read()
        response = HttpResponse(content_type='image/jpeg')
        response.write(image_data)
        return response

    # if request.method == 'GET':
    #     # process_image(save_location)
    #     data = {
    #         'test': 'Hello from Django'
    #         # Add more data as needed
    #     }
    #     try:
    #         response = requests.post(
    #             'http://localhost:3000', json=data)
    #         print("it tried?")
    #     except:
    #         return JsonResponse({'message': 'Failed to send data'}, status=500)
    # after post delete the image in the save_location.

    #     return JsonResponse({'message': 'Image uploaded successfully'})
    # else:
    #     return JsonResponse({'error': 'No image file provided'}, status=400)


# def get_processed_image(request, image_id):
#     # The request needs to have the name of the image...
#     # I imagine we have a load time where the image gets processed.
#     # once it is done we give a button for the user to click which sends the photo back.
#     # Once it has sent back we will delete it from our mdeia folder.

#     # Open the image file and create a FileResponse
#     img_file_path = 'media/images/'
#     image_file = open(image_path, 'rb')
#     response = FileResponse(image_file)

    # return response
