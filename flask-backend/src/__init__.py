from flask import Flask
from flask_cors import CORS 



def create_app():
    app = Flask(__name__)
    CORS(app)
    from src.routes.predict_route import predict_bp
    from src.routes.prescription_route import prescription_bp
    from src.routes.chat_route import chat_bp
    app.register_blueprint(predict_bp)
    app.register_blueprint(prescription_bp)
    app.register_blueprint(chat_bp)
    return app