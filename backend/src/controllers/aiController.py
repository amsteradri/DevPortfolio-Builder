from flask import Blueprint, request, jsonify
from src.utils.portfolio_agent import generate_portfolio
from flask_cors import cross_origin

bp = Blueprint("ai", __name__)

@bp.route('/api/generate-portfolio', methods=['POST', 'OPTIONS'])
@cross_origin()
def generate():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        prompt = data.get("prompt", "")
        if not prompt:
            return jsonify({"error": "Prompt vacío"}), 400
            
        html_code = generate_portfolio(prompt)
        return jsonify({"html": html_code})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
