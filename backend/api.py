""" REST interface for Google marker """
import json
import os
from urllib.parse import quote_plus
import time
import requests

from flask import request, jsonify
from flask import Flask
from flask_compress import Compress
from flask_cors import cross_origin


MARKERS_FILE_PATH = 'markers.json'
GOOGLE_GEOLOCATION_URL = "https://maps.googleapis.com/maps/api/geocode/json?"

app = Flask(__name__)
COMPRESS_MIMETYPES = [
    'application/json'
]

COMPRESS_LEVEL = 6
COMPRESS_MIN_SIZE = 500
Compress(app)


def error_response(msg, code):
    """ Handle error response """
    err_msg = jsonify({'error':msg})
    return (err_msg, code)


def read_file():
    """ Open and read the file content """
    with open(MARKERS_FILE_PATH, "r") as read_file:
        return json.load(read_file)


@app.route('/api/marker-list', methods=['GET'])
@cross_origin()
def marker_list():
    """ Fetch the list of markers """
    try:
        if not os.path.isfile(MARKERS_FILE_PATH):
            return error_response("File doesn't exist", 400)
        marker_list = read_file()

    except Exception:
        error_response('Failed to read the content', 400)

    return jsonify(marker_list)


@app.route('/api/marker-update', methods=['POST'])
@cross_origin()
def marker_add():
    """ Add/Delete new record to list of markers """
    marker_temp = request.get_json()
    if marker_temp is None:
        return error_response("Bad arguments", 400)

    try:
        if not os.path.isfile(MARKERS_FILE_PATH):
            return error_response("File doesn't exist", 400)

        with open(MARKERS_FILE_PATH, "w") as write_file:
            json.dump(marker_temp, write_file)

    except Exception:
        error_response('Failed to write the content', 400)

    return jsonify({'status': True})


@app.route('/api/search-geo-location', methods=['GET'])
@cross_origin()
def search_geo_location():
    """ Search api for Google geocoding """
    address = request.args.get('address')
    key = request.args.get('key')
    if address is None:
        return error_response("address argument is missing", 400)
    if key is None:
        return error_response("key argument is missing", 400)

    try:
        results = []
        santitize_address = quote_plus(address)
        url = GOOGLE_GEOLOCATION_URL + 'address=' + santitize_address + '&key=' + key
        headers = {
            'Content-Type':'application/json'
        }
        start = time.time()
        resp = requests.get(url, headers=headers, timeout=5)
        end = time.time()
        print("Time taken %f seconds" % (end - start))
        response_data = resp.json()
        error_message = response_data.get("error_message")
        if error_message is not None:
            return error_response(error_message, 400)
        results = response_data.get("results")

    except Exception:
        error_response('Failed to write the content', 400)

    return jsonify(results)


if __name__ == '__main__':
    # For development: debug=True
    #app.run(host='127.0.0.1', port=8090, debug=True)
    app.run(host='127.0.0.1', port=8090)
