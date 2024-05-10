import pandas as pd
import numpy as np
from sklearn.decomposition import PCA
import joblib
data = pd.read_csv('train.csv')
from sklearn.cluster import KMeans
from sklearn.preprocessing import LabelEncoder
import csv

encoder = LabelEncoder()

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

data = preprocessing_model(f'{url}/train.csv')
data['Segmentation'] = encoder.fit_transform(data['Segmentation'])
X = data['Segmentation']
x = np.array(X)
x = x.reshape(-1, 1)

x = PCA(1).fit_transform(x)
model = KMeans(n_clusters=4)
model.fit(x)

y_means = model.predict(x)
joblib.dump(model, 'Customer_Segmentation.joblib')