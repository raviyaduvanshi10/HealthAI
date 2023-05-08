from flask import Flask, request, jsonify, render_template
import pandas as pd
import joblib
from flask_cors import CORS
from flask_restful import Resource, Api
from bson.objectid import ObjectId
from flask import Flask, render_template, request, jsonify, Response
from pymongo import MongoClient
from flask_cors import CORS
from flask_restful import Api, Resource
import bcrypt

app = Flask(__name__)
CORS(app)
api = Api(app)


client = MongoClient(["mongodb://127.0.0.1:27017"])
deseaseManagement = client["Desease-Prediction"]  # Root Database
credentials = deseaseManagement["Admin's_Credentials"]

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

class RegisterAdmin(Resource):
    def post(self):
        adminJson = request.get_json(force=True)
        userName = adminJson["userName"]
        password = adminJson["password"]
        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())

        credentials.insert_one({
            "userName": userName,
            "password": hashed_pw
        })

        return jsonify({
            "status code": 200,
            "message": "Hi " + userName + "! you have registered successfully as admin "
        })


api.add_resource(RegisterAdmin, '/registeradmin')

def varifyAdmin(userName, password):
    hashed_pw = credentials.find({
        "userName": userName
    })[0]["password"]
    if bcrypt.hashpw(password.encode('utf8'), hashed_pw) == hashed_pw:
        return True
    else:
        False


class LoginAdmin(Resource):
    def post(self):
        loginDeatils = request.get_json(force=True)
        userName = loginDeatils["userName"]
        password = loginDeatils["password"]
        correct_pw = varifyAdmin(userName, password)
        if not correct_pw:
            return jsonify({
                "status code": 302,
                "message": "You have entered an invalid username or password"
            })
        adminId = credentials.find({
            "userName": userName
        })[0]["_id"]

        return jsonify({
            "status code ": 200,
            "message": "Hi " + userName + "! you are logged in successfully.",
            "adminId": str(adminId),
            "_employeeId": str(adminId),
            "loginType": "Admin",
            "userName": userName
        })


api.add_resource(LoginAdmin, "/loginadmin")

if __name__ == "__main__":
    app.run(use_reloader = True, debug=True)