# Opening .json, .txt, .csv, .xlsx, and zipfiles using pandas for manual data integration


def open_files(filename):
    import pandas as pd
    import zipfile
    
    try:
        if filename.endswith('.json'):
            # json file
            with open(filename) as json_file:
                data = json.load(json_file)
                df = pd.DataFrame(data)
            
        elif filename.endswith('.txt'):
            # .txt file
            data = pd.read_csv(filename, delimiter='\t')
            df = pd.DataFrame(data)
            
        elif filename.endswith('.csv'):
            # .csv file
            data = pd.read_csv(filename)
            df = pd.DataFrame(data)
        elif filename.endswith('.xlsx'):
            # Excel file
            data = pd.read_excel(filename)
            df = pd.DataFrame(data)
            
        elif filename.endswith('.zip'):
            # ZIP File
            with zipfile.ZipFile(filename) as archive:
                file_list = archive.namelist()
                df = pd.DataFrame(file_list)         
        else:
            raise ValueError('Unsupported File Type!') 
    except FileNotFoundError:
        print("File Not Found! ", filename)
        return "File not found"
    except Exception as e:
        print("An Error Occurred! ", e)
        return None

        
    return df