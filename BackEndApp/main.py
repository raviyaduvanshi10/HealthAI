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
import json
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators, SubmitField
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
app.secret_key = 'secretKey'
CORS(app)
api = Api(app)


client = MongoClient(["mongodb://127.0.0.1:27017"])
deseaseManagement = client["Desease-Prediction"]  # Root Database
users = deseaseManagement["Users"]

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

class AdminForm(FlaskForm):
    name = StringField("Name", [validators.DataRequired()])
    email = StringField("Email", [validators.DataRequired()])
    userName = StringField("Username", [validators.DataRequired()])
    password = PasswordField("Password", [validators.DataRequired()])
    submit = SubmitField("Send")

@app.route('/addadmin', methods=["GET","POST"])
def add_admin():
    form = AdminForm() 
    if request.method == 'POST':
        name =  request.form["name"]
        email = request.form["email"]
        password = request.form["password"]
        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        try:
            checkedUserName = users.find({
                "emailId": email
                })[0]["emailId"]

        except:
            checkedUserName = False
        if checkedUserName:
            return render_template('form.html', form=form)
        users.insert_one({
            "name": name,
            "emailId": email,
            "password": hashed_pw,
            "accessType": "admin"
        })
        print("Admin is Registered.")
        return render_template('root.html')

    else:
        return render_template('form.html', form=form)
    
def predictDesease(param):
    training_dataset = pd.read_csv("models/datasets/Training_dataset.csv")
    Y = training_dataset[["prognosis"]]
    X = training_dataset.iloc[:, :20]
    x_train,x_test,y_train,y_test = train_test_split(X,Y,test_size=0.2,random_state=42)
    rfc= RandomForestClassifier(random_state=42)
    model_rfc = rfc.fit(x_train,y_train)
    data = pd.DataFrame(param)
    predict = model_rfc.predict(data)
    print(predict)
    return jsonify([{"prediction": predict[0]}])

class Predictions(Resource):
    def post(self):
        if request.files:
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
        else:
            jsonData = request.get_json(force=True)
            for key in jsonData:
                jsonData[key] = list(map(int, jsonData[key]))
            res = predictDesease(jsonData)
            return res

api.add_resource(Predictions, '/predictions')

class RegisterAdmin(Resource):
    def post(self):
        adminJson = request.get_json(force=True)
        name = adminJson["name"]
        emailId = adminJson["email"]
        password = adminJson["password"]
        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        try:
            checkedUserName = users.find({
                "emailId": emailId
                })[0]["emailId"]

        except:
            checkedUserName = False
        if checkedUserName:
            return jsonify({
                "message": "Admin's username is already exist.Please choose any other.",
                "statusCode": 302
            })
        users.insert_one({
            "name": name,
            "emailId": emailId,
            "password": hashed_pw,
            "accessType": "admin"
        })

        return jsonify({
            "status code": 200,
            "message": "Hi " + emailId + "! you have registered successfully as admin "
        })


api.add_resource(RegisterAdmin, '/registeradmin')

def varifyAdmin(userName, password):
    hashed_pw = users.find({
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
        adminId = users.find({
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

class RegisterUser(Resource):
    def post(self):
        employeeData = request.form['jsonData']
        userJson = json.loads(employeeData)
        name = userJson['name']
        mobileNumber = userJson['mobileNumber']
        dob = userJson['dob']
        emailId = userJson['emailId']
        password = userJson["password"]
        gender = userJson['gender']
        hashed_pw = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt())
        try:
            checkedUserName = users.find({
                "emailId": emailId
                })[0]["emailId"]

        except:
            checkedUserName = False
        
        if checkedUserName:
            return jsonify({
                "message": "{emailId} is already exist.Please choose any other.".format(emailId=emailId),
                "statusCode": 302
            })


        users.insert_one({
            "name": name,
            "mobileNumber": mobileNumber,
            "dob": dob,
            "emailId": emailId,
            "password": hashed_pw,
            "gender": gender,
            "accessType": "user",
        })

        return jsonify({
            "anouncement": "Employee's data is store in database.",
            "name": name,
            "gender": gender,
            "mobileNumber": mobileNumber,
            "emailId": emailId,
            "dob": dob,
            "active": True,
            "statusCode": 200
        })

    def get(self):
        allData = users.find()
        employeeJson = []
        for data in allData:
                id = data["_id"]
                name = data["name"]
                userName = data["userName"]
                gender = data["gender"]
                dob = data["dob"]
                emailId = data["emailId"]
                mobileNumber = data["mobileNumber"]
                active = data["active"]
                dataDict = {
                    "id": str(id),
                    "name": name,
                    "userName": userName,
                    "gender": gender,
                    "dob": dob,
                    "emailId": emailId,
                    "mobileNumber": mobileNumber,
                    "active": active
                }
                employeeJson.append(dataDict)
        print(employeeJson)
        return jsonify(employeeJson)


api.add_resource(RegisterUser, '/registeruser')

def varifyUser(emailId, password):
    hashed_pw = users.find({
        "emailId": emailId
    })[0]["password"]
    if bcrypt.hashpw(password.encode('utf8'), hashed_pw) == hashed_pw:
        return True
    else:
        False


class UserLogin(Resource):
    def post(self):
        loginJson = request.get_json(force=True)
        emailId = loginJson["emailId"]
        password = loginJson["password"]
        correct_pw = varifyUser(emailId, password)
        if not correct_pw:
            return jsonify({
                "status": 302,
                "message": "You have entered an invalid username or password"
            })
        _id = users.find({
            "emailId": emailId
        })[0]["_id"]
        data = users.find_one({"_id": _id})
        name = data["name"]
        emailId = data["emailId"]
        accessType = data["accessType"]
        return jsonify({
            "_employeeId": str(_id),
            "name": name,
            "emailId": emailId,
            "accessType":accessType,
            "status": 200
        })


api.add_resource(UserLogin, "/userlogin")

if __name__ == "__main__":
    app.run(debug=True)