from flask import Blueprint, request, jsonify
import os
import sys
import logging

project_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.append(project_dir)
from config import Config

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

heartbeat_bp = Blueprint('heartbeat_route', __name__)

@heartbeat_bp.route('/ping')
def ping():
    return jsonify({'status': 'active', 'message': 'pong'}), 200

@heartbeat_bp.route('/status')
def status():
    return jsonify({
        'status': 'running',
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
    }), 200