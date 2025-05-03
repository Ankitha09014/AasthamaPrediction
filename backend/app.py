from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, mean_absolute_error, mean_squared_error, r2_score

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load('knn_model.pkl')
le_gender = joblib.load('le_gender.pkl')
le_smoking = joblib.load('le_smoking.pkl')
le_cough = joblib.load('le_cough.pkl')
le_diagnosis = joblib.load('le_diagnosis.pkl')

# Load dataset for metrics
data = pd.read_csv(r"C:\Users\ankitha\Desktop\Fullstack_Asthma-Prediction_Website\backend\asthma_modified_dataset.csv")
data['Intensity of cough'] = data['Intensity of cough'].apply(lambda x: 'low' if 'low' in x.lower() else ('medium' if 'medium' in x.lower() else 'high'))

data['Gender'] = le_gender.transform(data['Gender'])
data['Smoking_Status'] = le_smoking.transform(data['Smoking_Status'])
data['Intensity of cough'] = le_cough.transform(data['Intensity of cough'])
data['Asthma_Diagnosis'] = le_diagnosis.transform(data['Asthma_Diagnosis'])

X = data[['Age', 'Gender', 'Smoking_Status', 'Medvalue', 'Intensity of cough']]
y = data['Asthma_Diagnosis']
preds = model.predict(X)

# Calculate accuracy and other metrics
accuracy = accuracy_score(y, preds)
precision = precision_score(y, preds)
recall = recall_score(y, preds)
f1 = f1_score(y, preds)

# Confusion Matrix and other error metrics
tn, fp, fn, tp = confusion_matrix(y, preds).ravel()
sensitivity = recall
specificity = tn / (tn + fp)

# Calculate Mean Absolute Error (MAE), Mean Squared Error (MSE) and R² score
mae = mean_absolute_error(y, preds)
mse = mean_squared_error(y, preds)
r2 = r2_score(y, preds)

# Get confusion matrix
conf_matrix = confusion_matrix(y, preds).tolist()  # Convert the matrix to a list of lists

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        age = int(input_data['age'])
        gender = le_gender.transform([input_data['gender']])[0]
        smoking = le_smoking.transform([input_data['smoking_status']])[0]
        medvalue = float(input_data['medvalue'])
        cough = le_cough.transform([input_data['intensity_cough']])[0]

        input_df = pd.DataFrame([[age, gender, smoking, medvalue, cough]], 
                                 columns=['Age', 'Gender', 'Smoking_Status', 'Medvalue', 'Intensity of cough'])

        pred = model.predict(input_df)
        label = le_diagnosis.inverse_transform(pred)[0]

        # Send response with performance, error metrics, and confusion matrix
        return jsonify({
            "prediction": label,
            "accuracy": float(accuracy),
            "precision": float(precision),
            "recall": float(recall),
            "f1": float(f1),
            "sensitivity": float(sensitivity),
            "specificity": float(specificity),
            "mae": float(mae),
            "mse": float(mse),
            "r2": float(r2),
            "confusion_matrix": conf_matrix  # Add confusion matrix to the response
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run Flask on port 5001
