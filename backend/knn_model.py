import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, mean_absolute_error, mean_squared_error, r2_score
import joblib

# Load the dataset
data = pd.read_csv("./asthma_modified_dataset.csv")

# Clean 'Intensity of cough' column to get rid of extra text
data['Intensity of cough'] = data['Intensity of cough'].apply(lambda x: 'low' if 'low' in x else ('medium' if 'medium' in x else 'high'))

# Encode categorical variables
le_gender = LabelEncoder()
le_smoking = LabelEncoder()
le_cough = LabelEncoder()
le_diagnosis = LabelEncoder()

data['Gender'] = le_gender.fit_transform(data['Gender'])
data['Smoking_Status'] = le_smoking.fit_transform(data['Smoking_Status'])
data['Intensity of cough'] = le_cough.fit_transform(data['Intensity of cough'])
data['Asthma_Diagnosis'] = le_diagnosis.fit_transform(data['Asthma_Diagnosis'])

# Define features and target variable
X = data[['Age', 'Gender', 'Smoking_Status', 'Medvalue', 'Intensity of cough']]
y = data['Asthma_Diagnosis']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Initialize the KNN model
knn = KNeighborsClassifier(n_neighbors=3)

# Fit the model on the training data
knn.fit(X_train, y_train)

# Make predictions
predictions = knn.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, predictions)
print("Accuracy of the KNN model:", accuracy)

# Precision, recall, F1 score, etc.
precision = precision_score(y_test, predictions)
recall = recall_score(y_test, predictions)
f1 = f1_score(y_test, predictions)

# Calculate specificity
tn, fp, fn, tp = confusion_matrix(y_test, predictions).ravel()
specificity = tn / (tn + fp)

print("Precision:", precision)
print("Recall:", recall)
print("F1-score:", f1)
print("Sensitivity (Recall):", recall)
print("Specificity:", specificity)
print("Confusion Matrix:")
print(confusion_matrix(y_test, predictions))

# Calculate Mean Absolute Error (MAE) and Mean Squared Error (MSE)
mae = mean_absolute_error(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("Mean Absolute Error (MAE):", mae)
print("Mean Squared Error (MSE):", mse)
print("R-squared:", r2)

# Save model and encoders
joblib.dump(knn, 'knn_model.pkl')
joblib.dump(le_gender, 'le_gender.pkl')
joblib.dump(le_smoking, 'le_smoking.pkl')
joblib.dump(le_cough, 'le_cough.pkl')
joblib.dump(le_diagnosis, 'le_diagnosis.pkl')

print("Model and encoders saved!")
