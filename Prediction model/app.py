from flask import Flask, request, jsonify
import joblib
import json
import requests
import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyCe25AwGH0c1-8jIlYK_SCy7wGjVfWy--o")

gemini_model=genai.GenerativeModel('gemini-1.5-flash')

model = joblib.load('model.pkl')
scaler = joblib.load('scaler.bin')

app = Flask(__name__)

@app.route("/")
def home():
    return "Liver Prediction API is running."

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        data = request.json

        # Extract data from the JSON request
        drug = 1.0
        age = float(data.get('age'))
        
        gender = data.get('sex')
        sex = 0.0 if gender == 'Female' else 1.0 if gender == 'Male' else -1.0
        
        ascites = 0.0 if data.get('ascites') == 'N' else 1.0 if data.get('ascites') == 'Y' else -1.0
        hepatomegaly = 0.0 if data.get('hepatomegaly') == 'N' else 1.0 if data.get('hepatomegaly') == 'Y' else -1.0
        spider = 0.0 if data.get('spiders') == 'N' else 1.0 if data.get('spiders') == 'Y' else -1.0
        edema = 0.0 if data.get('edema') == 'N' else -1.0 if data.get('edema') == 'S' else 1.0 if data.get('edema') == 'Y' else -1.0
        
        bilirubin = float(data.get('bilirubin'))
        cholesterol = float(data.get('cholesterol'))
        albumin = float(data.get('albumin'))
        copper = float(data.get('copper'))
        alk_phos = float(data.get('alk_phos'))
        sgot = float(data.get('sgot'))
        tryglycerides = float(data.get('tryglycerides'))
        platelets = float(data.get('platelets'))
        prothrombin = float(data.get('prothrombin'))
        
        X_test = scaler.transform([[
            drug, age, sex, ascites, hepatomegaly, spider, edema,
            bilirubin, cholesterol, albumin, copper, alk_phos, sgot,
            tryglycerides, platelets, prothrombin
        ]])
        
        predictions = model.predict(X_test)
        output = predictions[0]
        response = {
            "stage": int(output),
            "description": (
                "Normal liver" if output == 1 else
                "Fatty liver" if output == 2 else
                "Liver Fibrosis" if output == 3 else
                "Liver Cirrhosis" if output == 4 else
                "Unknown condition"
            )
        }
        # return jsonify(response)

        
        # # Prepare the request payload for the Gemini model
        # prediction_text = (
        #     "Normal liver" if output == 1 else
        #     "Fatty liver" if output == 2 else
        #     "Liver Fibrosis" if output == 3 else
        #     "Liver Cirrhosis" if output == 4 else
        #     "Unknown condition"
        # )

        # print(prediction_text)
        
        # gemini_payload = {
        #     "stage": "",
        #     "analysis": "",
        #     "lifestyle_recommendations": [],
        #     "precautions": [],
        #     "self_treatment_plan": [],
        #     "doctor_type": [
        #         "Doctor 1", "Doctor 2", "Doctor 1", "Doctor 2", 
        #         "Doctor 1", "Doctor 2"
        #     ]
        # }
        
        # # Generate analysis using the Gemini model
        gemini_response = gemini_model.generate_content(
            f'Generate an analysis for stage {output} liver condition, with {response}. Include lifestyle_recommendations, precautions, self_treatment_plans, and suitable doctors to visit as doctor_types. Give the output in python dictionary format as: {{"stage": "", "analysis": "", "lifestyle_recommendations": [], "precautions": [], "self_treatment_plan": [], "doctor_type": ["Doctor 1", "Doctor 2", "Doctor 3", "Doctor 4", "Doctor 5", "Doctor 6"]}}. Only give the dictionary format and no other text or symbol. NO need to specify pyhton at begining and apostrophe at end'
        )

        # # Parse and return the response from the Gemini model
        # # gemini_payload['analysis'] = gemini_response.content 
        # print(gemini_response.text)
        return (gemini_response.text)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=3005)


