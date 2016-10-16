import data_connector
from flask import jsonify, Flask, request
from webargs import fields
from webargs.flaskparser import use_args
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.errorhandler(422)
def validation_failed(e):
    return jsonify(error=400, description=str(e.description), messages=str(e.data["messages"])), 400


@app.route('/<preferences>/recommended_locations', methods=["POST"])
def recommend_locations(preferences):
    print(list(preferences))
    try:
        return jsonify(data_connector.fetch_recommended_locations(list(preferences))), 201
    except Exception as e:
        return jsonify(error=400, description=str(e)), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5050')
