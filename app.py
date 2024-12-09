from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)
STATE_FILE = "state.json"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/save-state", methods=["POST"])
def save_state():
    data = request.json
    with open(STATE_FILE, "w") as f:
        json.dump(data, f)
    return jsonify({"message": "State saved successfully!"})

@app.route("/load-state", methods=["GET"])
def load_state():
    try:
        with open(STATE_FILE, "r") as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"message": "No state found!"}), 404

if __name__ == "__main__":
    app.run(debug=True)
