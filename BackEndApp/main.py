from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
from flask_cors import CORS
from flask_restful import Resource, Api

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/')
def root():
    return render_template("root.html")

@app.route('/home')
def home():
    return render_template("home.html", len=0)

@app.route('/home', methods=['POST'])
def main():
    file = pd.read_csv(request.files["file"])
    df = file.drop(["sn"],axis=1)
    model = joblib.load("models/random_forest.joblib")
    test_prediction = model.predict(df)
    print(test_prediction)
    return render_template('home.html', len = len(test_prediction), test_prediction = test_prediction)

class Predictions(Resource):
    def post(self):
        file = pd.read_csv(request.files["file"])
        df = file.drop(["sn"],axis=1)
        model = joblib.load("models/random_forest.joblib")
        test_prediction = model.predict(df)
        jsonData = []
        dictData = {}
        for i in range(1, len(test_prediction)+1):
            dictData[i] = test_prediction[i-1]
        jsonData.append(dictData)
        print(jsonData)
        return jsonify(jsonData)

api.add_resource(Predictions, '/predictions')

if __name__ == "__main__":
    app.run(use_reloader = True, debug=True)