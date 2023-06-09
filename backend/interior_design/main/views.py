import requests
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, JsonResponse
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

        with open(save_location, 'wb') as f:
            for chunk in uploaded_image.chunks():
                f.write(chunk)

        process_image(save_location, 4).save(save_location)

        # def internalCallback():
        #     print("internal call back fired")
        #     internal_request = HttpRequest()
        #     internal_request.method = 'POST'
        #     internal_request.path = '/postback/'
        #     internal_request.POST = {'image_file_name': save_location}
        #     response = upload_image_postback(internal_request)
        #     return response
        # # Handle the response from the frontend server
        # internalCallback()
        return JsonResponse({'image_url': process_image(save_location, 4).save(save_location)})
    else:
        return JsonResponse({'error': 'upload_image failed'}, status=400)

# so it works, but then we make another request from the frontend and the data has already expired...
# so we need to figure out how to just post it or something.


@csrf_exempt
def upload_image_postback(request):
    # Retrieve the image file name from the request parameters
    image_file_name = request.POST.get('image_file_name')
    print("fires outside")
    print(image_file_name)
    # Perform further processing with the image file name
    # For example, you can use it to locate and manipulate the corresponding image file
    try:
        print("fires inside?")
        print(image_file_name)
        with open(image_file_name, 'rb') as f:
            # Adjust content_type based on your image type
            return FileResponse(f, content_type='image/jpeg')
    except FileNotFoundError:
        return HttpResponse("Image not found.", status=404)
