from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Cross origin requests

def test(a, b):
    return a + b

@app.route('/process', methods=['POST'])
def process_data():
    data = request.json
    num1 = data.get('num1')
    num2 = data.get('num2')
    if num1 is None or num2 is None:
        return jsonify({'error': 'Missing input.'}), 400
    try:
        num1 = int(num1)
        num2 = int(num2)
    except ValueError:
        return jsonify({'error': 'Integer inputs only.'}), 400
    result = test(num1, num2)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
