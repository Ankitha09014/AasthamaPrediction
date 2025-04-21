from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score, confusion_matrix

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load('knn_model.pkl')
le_gender = joblib.load('le_gender.pkl')
le_smoking = joblib.load('le_smoking.pkl')
le_cough = joblib.load('le_cough.pkl')
le_diagnosis = joblib.load('le_diagnosis.pkl')

# Load the training data for metrics calculation
data = pd.read_csv("asthma_modified_dataset.csv")
data['Intensity of cough'] = data['Intensity of cough'].apply(lambda x: 'low' if 'low' in x else ('medium' if 'medium' in x else 'high'))
data['Gender'] = le_gender.transform(data['Gender'])
data['Smoking_Status'] = le_smoking.transform(data['Smoking_Status'])
data['Intensity of cough'] = le_cough.transform(data['Intensity of cough'])
data['Asthma_Diagnosis'] = le_diagnosis.transform(data['Asthma_Diagnosis'])

X = data[['Age', 'Gender', 'Smoking_Status', 'Medvalue', 'Intensity of cough']]
y = data['Asthma_Diagnosis']

# Make predictions for the entire dataset to calculate metrics
predictions = model.predict(X)

# Calculate model metrics
accuracy = accuracy_score(y, predictions)
precision = precision_score(y, predictions)
recall = recall_score(y, predictions)
f1 = f1_score(y, predictions)

# Confusion Matrix
tn, fp, fn, tp = confusion_matrix(y, predictions).ravel()
sensitivity = recall
specificity = tn / (tn + fp)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        age = int(data["age"])
        gender = le_gender.transform([data["gender"]])[0]
        smoking_status = le_smoking.transform([data["smoking_status"]])[0]
        medvalue = float(data["medvalue"])

        if data["intensity_cough"] not in le_cough.classes_:
            return jsonify({'error': f"Invalid intensity: {data['intensity_cough']}. Allowed: {list(le_cough.classes_)}"})

        intensity = le_cough.transform([data["intensity_cough"]])[0]

        input_df = pd.DataFrame([[age, gender, smoking_status, medvalue, intensity]],
                                columns=['Age', 'Gender', 'Smoking_Status', 'Medvalue', 'Intensity of cough'])

        prediction = model.predict(input_df)
        label = le_diagnosis.inverse_transform(prediction)[0]

        # Return prediction along with model metrics
        return jsonify({
            'prediction': label,
            'accuracy': accuracy,
            'precision': precision,
            'recall': recall,
            'f1': f1,
            'sensitivity': sensitivity,
            'specificity': specificity
        })

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
