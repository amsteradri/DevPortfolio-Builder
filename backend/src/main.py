from flask import Flask
from flask_cors import CORS
from src.controllers.aiController import bp as ai_bp

app = Flask(__name__)
CORS(app)  # habilita CORS para conexión con el frontend

app.register_blueprint(ai_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
