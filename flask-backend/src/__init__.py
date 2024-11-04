from flask import Flask
from flask_cors import CORS 
from src.service.heartbeat import HeartbeatService


def create_app():
    app = Flask(__name__)
    CORS(app)
    from src.routes.predict_route import predict_bp
    from src.routes.prescription_route import prescription_bp
    from src.routes.chat_route import chat_bp
    from src.routes.heartbeat_route import heartbeat_bp
    app.register_blueprint(heartbeat_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(prescription_bp)
    app.register_blueprint(chat_bp)

    heartbeat = HeartbeatService(app)
    with app.app_context():
        heartbeat.start()

    return app