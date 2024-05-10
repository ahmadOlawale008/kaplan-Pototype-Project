from sklearn.linear_model import LinearRegression
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error
import joblib
import pandas as pd
import numpy as np



pca = PCA(2)
scaler = StandardScaler()
pca_pipeline = Pipeline([('scaler', scaler), ('pca', pca)])

def preprocessing_model(file):
    import pandas as pd
    import numpy as np
    from sklearn.preprocessing import OneHotEncoder
    from sklearn.preprocessing import LabelEncoder
    from sklearn.impute import SimpleImputer
    import csv
    
    categorical_data = []
    numerical_data = []
    label_encoder = LabelEncoder()
    
    #Open the dataset with pandas
    data = pd.read_csv(file)
    
    with open(file) as f_obj:
        reader = csv.reader(f_obj)
        header = next(reader)
        # Checking for string and integer data types in the dataset
        for head in header:
            check = data[head].dtype
            if check == int:
                numerical_data.append(head)
            elif check == str:
                categorical_data.append(head)
            elif check == 'O':
                categorical_data.append(head)
    
    # Encode categorical data
    for labels in categorical_data:
        data[labels] = label_encoder.fit_transform(data[labels])
       
        
    for label in numerical_data:
        data[label].fillna(data[label].mean(), inplace=True)
        
        
    return data

import os
from django.conf import settings
url = os.path.join(settings.BASE_DIR, "base", "machine_learning_python")


data = preprocessing_model(os.path.join(url, "2m Sales Records.csv"))
X = data.drop('Total Revenue', axis=1)
y = data['Total Revenue']
X = PCA(2).fit_transform(X)
Xtrain, Xtest, ytrain, ytest = train_test_split(X, y, train_size=0.8, random_state=42)

model = LinearRegression()

model.fit(Xtrain, ytrain)
y_model = model.predict(Xtest)
# train_error = mean_squared_error(ytrain, y_model)

from sklearn.metrics import r2_score
r_squared = r2_score(ytest, y_model)
joblib.dump(model, 'Regression_Model_Revenue.joblib')
