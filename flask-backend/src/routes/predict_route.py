from flask import Blueprint, request, jsonify
import os
import sys
import logging
import numpy as np
import joblib

project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_dir)
from config import Config

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

predict_bp = Blueprint('predict_route', __name__)

model = joblib.load(Config.MODEL_PATH)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        hr = data.get('hr')
        resp = data.get('resp')
        spo2 = data.get('spo2')
        temp = data.get('temp')

       
        if None in [hr, resp, spo2, temp]:
            return jsonify({'status': 'error', 'message': 'Missing vital inputs'}), 400

       
        input_data = np.array([[hr, resp, spo2, temp]])
        prediction = model.predict(input_data)
        health_status = "Normal" if prediction[0] == 0 else "Abnormal"

       
        return jsonify({'status': 'success', 'health_status': health_status})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})