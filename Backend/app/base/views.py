from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import os
from django.conf import settings
import json
import pandas as pd
import requests
from rest_framework.views import APIView
from django.conf import settings
import google.generativeai as ai
from joblib import load

from .machine_learning_python import (customer_chun, regression_model_revenue, 
                                      preprocessing_and_standardization, open_datasets)
from .serializers import FileSerializer
from rest_framework.mixins import status
from rest_framework.generics import ListCreateAPIView
from .models import File
from rest_framework.response import Response
import math
import joblib
from .load_models import predict_function


url = os.path.join(settings.BASE_DIR, "base", "machine_learning_python")

# mdl = joblib.load(os.path.join(url, "Clustering_Customer_Segmentation.joblib"))
# print(mdl.predict(os.path.join(url, "customer_churn_dataset-testing-master_-_Copy_-_Copy.csv")))

from django.http import JsonResponse

def predict_view(request):
    if request.method == 'GET':
        # Get the input data from the GET request, you might use request.GET dictionary
        input_data = {
            'feature1': request.GET.get('feature1', default_value),
            'feature2': request.GET.get('feature2', default_value),
            # ... add other features as needed
        }

        # Call the function to make predictions
        result = predict_function(input_data)

        # Return the result as JSON
        return JsonResponse(result)


def get_size(bytes):
    sizes = ["bytes", "KB", "MB", "GB", "TB"];
    if bytes == 0:
        return f"0 {bytes}"
    i=math.floor(math.log(bytes) / math.log(1024))
    return f" {math.ceil((bytes / math.pow(1024, i)) * 100) / 100} {sizes[i]}"

class ChatBotAPI(APIView):
    def post(self, request):
        msg = request.data.get("message")
        try:
            ai.configure(api_key=settings.BARD_API_KEY.split("api_key = ")[-1])
            response = ai.chat(messages=msg)
            print(response, "i an chat reponse")
            return Response(status=status.HTTP_200_OK, data={"message": list(response.candidates)})
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": None})
    # def get(self, request):
    #     msg = f"Interprete the result of customer churn {training['y_model']}"
    #     # print(msg)
    #     try:
    #         ai.configure(api_key=settings.BARD_API_KEY.split("api_key = ")[-1])
    #         response = ai.chat(messages=msg)
    #         print(response)
    #         return Response(status=status.HTTP_200_OK, data={"message": list(response.candidates)})
    #     except Exception as e:
    #         print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": None})
        
def scan_datasets(request, slug):
    link = f"{url}/test.csv"
    f = get_object_or_404(File, slug=slug)
    if f:
        index_per_page = 20
        page_number = int(request.GET.get("page", 1))
        start_index = (page_number - 1) * index_per_page
        end_index = start_index + 20
        file = open_datasets.open_files(f.file.path).iloc[start_index: end_index].to_json()
        file_json = json.loads(file)
        total_items_in_file = len(json.loads(file))
        total_pages = (total_items_in_file + index_per_page - 1) // index_per_page
        has_next_page = page_number > total_pages
        response_data = {"title": f.title, "size": f.file.size,
                        "total": total_items_in_file,
                        "created":f.created, "updated":f.updated,
                        "file": file}
        return JsonResponse(safe=False, data=response_data)
    return Response(status=status.HTTP_400_BAD_REQUEST, data={})
from rest_framework.response import Response
class FilesAPi(ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    def post(self, request, *args, **kwargs):
        data = request.data
        serializer_instance = FileSerializer(data=request.data)
        if serializer_instance.is_valid():
            serializer_instance.save()
            return Response(data=serializer_instance.data, status=status.HTTP_200_OK)
        return Response(data={"message": serializer_instance.errors}, status=status.HTTP_400_BAD_REQUEST)

class TrainCustomerChun(APIView):
    def get(self, request, slug):
        f = get_object_or_404(File, slug=slug)
        if f: 
            training = regression_model_revenue.train_customer_churn(file_path=f.file.path)
            print(training['y_model'])
            return Response(status=status.HTTP_200_OK, data={"data": training['y_model']})
class FlutterTransferPayment(APIView):
    pass
class ScanDatasets(APIView):
    def get(self, request, slug):
        f = get_object_or_404(File, slug=slug)
        if f:
            index_per_page = 20
            page_number = int(request.GET.get("page", 1))
            start_index = (page_number - 1) * index_per_page
            end_index = start_index + 20
            df = open_datasets.open_files(f.file.path)
            file = df.iloc[start_index: end_index].to_json()
            
            total_items_in_file = len(df)
            
            total_pages = (total_items_in_file + index_per_page - 1) // index_per_page
            has_next_page = page_number <= total_pages
            response_data = {
                "status": 200, "title": f.title, 
                "size": f.file.size,"created":f.created, 
                "converted_size": get_size(f.file.size),
                "has_next": has_next_page,
                "total_pages": total_pages,
                "total_items_in_file": total_items_in_file,
                "updated":f.updated,  "file": json.loads(file),
                "name": str(f.file.name).replace("uploads/", " "),
            }
            return Response(status=status.HTTP_200_OK, data=response_data)
        return Response(status=status.HTTP_404_NOT_FOUND, data={"error": "Dataset not found \n  Please check your link to ensure you are directed to the right page"})

print(predict_function(os.path.join(url, "Test-Set.csv")))

def SampleApi(request):
    model = customer_chun.preprocessing_model(f"{url}/test.csv")
    return JsonResponse(safe=False, data={"status": 200, "message": pd.DataFrame(model).to_json()})
