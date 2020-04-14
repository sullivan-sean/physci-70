from flask import Flask, request
import json
from werkzeug.exceptions import BadRequest

app = Flask(__name__)

@app.route('/data', methods=["POST"])
def data_route():
    try:
        data = request.get_json()
        print(data)
    except (TypeError, BadRequest, KeyError):
        return "Error"
    return "Success"
