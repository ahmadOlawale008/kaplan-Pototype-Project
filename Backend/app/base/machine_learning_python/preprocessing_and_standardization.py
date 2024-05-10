from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.decomposition import PCA
import joblib
import pandas as pd
import numpy as np

def preprocessing_and_standardization(new_data):

    
    data = pd.read_csv(new_data)
    data = pd.DataFrame(data)
    numerical_columns = data.select_dtypes(include=['number']).columns
    categorical_columns = data.select_dtypes(include=['object']).columns
    
    
    # Pipelines
    numerical_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='mean')), ('scaler', StandardScaler())])
    categorical_transformer = Pipeline(steps=[('imputer', SimpleImputer(strategy='most_frequent')), ('onehot', OneHotEncoder(sparse=False))])
    
    preprocessor = ColumnTransformer(transformers=[('num', numerical_transformer, numerical_columns), ('cat', categorical_transformer, categorical_columns)])
    
    pca = PCA(2)
    entire_pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('pca', pca)])
    
    model = joblib.load('Regression_Model_Revenue.joblib')
    
    transformed_data = entire_pipeline.fit_transform(data)
    prediction = model.predict(transformed_data)
    
    return prediction