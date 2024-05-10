from django.urls import path
from base.views import SampleApi, ChatBotAPI, scan_datasets, FilesAPi, ScanDatasets, TrainCustomerChun
app_name = "basic_app"

urlpatterns = [
    path("", SampleApi, name='api'),
    path("chat", ChatBotAPI.as_view(), name='chat'),
    path("scan_datasets/<slug:slug>/", ScanDatasets.as_view(), name="scan_datasets"),
    path("file", FilesAPi.as_view(), name="list_create_file"),
    path("customer_chun/<slug:slug>/", TrainCustomerChun.as_view(), name="customer_chun")
]