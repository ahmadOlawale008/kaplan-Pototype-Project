# ml_module.py
# from sklearn.externals import joblib  # Use joblib for loading the model
import pandas as pd
from django.conf import settings
import os
from .machine_learning_python import preprocessing_and_standardization as preprocess_input

url = os.path.join(settings.BASE_DIR, "base", "machine_learning_python")

# def load_model():
#     # Load your machine learning model
#     model = joblib.load(os.path.join(url, "Regression_Model_Revenue.joblib"))
#     return model

def predict_function(input_data):

    # Preprocess the input data as needed (similar to your preprocessing_model function)
    processed_data = preprocess_input.preprocessing_and_standardization(input_data)


    # Return predictions
    return {"predictions": pd.DataFrame(processed_data).to_json()}
