from flask import Blueprint, request, jsonify
import os
import sys
import logging

project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_dir)
from config import Config
from src.service.prescription import MentalHealthAnalyzer

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

prescription_bp = Blueprint('prescription_route', __name__)

analyser = MentalHealthAnalyzer(google_api_key=Config.google_api_key)


@prescription_bp.route('/prescription', methods=['POST'])
def prescription():
    try:
        data = request.json

        depression = data.get('depression')
        stress = data.get('stress')
        anxiety = data.get('anxiety')

        hr = data.get('hr')
        resp = data.get('resp')
        spo2 = data.get('spo2')
        temp = data.get('temp')

        if None in [depression, stress, anxiety]:
            return jsonify({'status': 'error', 'message': 'Missing form inputs'}), 400

        if None in [hr, resp, spo2, temp]:
            return jsonify({'status': 'error', 'message': 'Missing vital inputs'}), 400

        status = analyser.check_vitals(hr, resp, spo2, temp)
        print(status)
        if status == "True":
            scores = {
                "hr": hr,
                "resp": resp,
                "spo2": spo2,
                "temp": temp
            }
        else:
            scores = {
                "depression": "{depression}/42".format(depression=depression),
                "anxiety": "{anxiety}/42".format(anxiety=anxiety),
                "stress": "{stress}/42".format(stress=stress)
            }

        prescription = analyser.analyze_scores(scores)

        return jsonify({
            'status': 'success',
            'prescription': prescription, 
            'scores': {
                "depression": analyser.depression_level(depression),
                "anxiety": analyser.anxiety_level(anxiety),
                "stress": analyser.stress_level(stress)
            }})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})    
