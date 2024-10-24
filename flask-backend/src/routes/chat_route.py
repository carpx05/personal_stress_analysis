from flask import Blueprint, request, jsonify
import os
import sys
import logging
import requests
import json

project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_dir)
from config import Config

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

chat_bp = Blueprint('chat_route', __name__)


@chat_bp.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json

        context = data.get('context')
        context = "give a general advice like a friend in about 1-3 lines" + context
        if context is None:
            return jsonify({'status': 'error', 'message': 'Missing context input'}), 400

        payload = json.dumps({
            "contents": [
                {
                "parts": [
                    {
                    "text": context
                    }
                ]
                }
            ]
            })
        headers = {
            'Content-Type': 'application/json'
            }
        print("gettting a response")
        response = requests.request("POST", Config.chatbot_url, headers=headers, data=payload)
        if response.status_code != 200 or response.text is None:
            return jsonify({'status': 'error', 'message': 'Failed to connect to chatbot'}), 500
        return jsonify({'status': 'success', 'response': response.text})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})