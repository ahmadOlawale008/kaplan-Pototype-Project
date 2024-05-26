from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.decomposition import PCA
from sklearn.impute import SimpleImputer
import pandas as pd
import numpy as np
import joblib


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

customer_chun_path = f"{url}/customer_churn_dataset-testing-master.csv"
data = preprocessing_model(file=customer_chun_path)

X = data.drop('Churn', axis=1)
y = data['Churn']
X = PCA(2).fit_transform(X)
Xtrain, Xtest, ytrain, ytest = train_test_split(X, y, train_size=0.8, random_state=42)
model = HistGradientBoostingClassifier(class_weight='balanced')
model.fit(Xtrain, ytrain)
y_model = model.predict(Xtest)


joblib.dump(model, 'Customer_Churn_Model.joblib')

