from flask import Flask
from flask_cors import CORS
from src.controllers.aiController import bp as ai_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(ai_bp)

# Habilitar modo debug y hot reload
app.config['DEBUG'] = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=True)
