from flask import Flask, request
from flask_cors import CORS
from app import test
from app.db import User
from peewee import *

app = Flask(__name__)
CORS(app)

categories = {"FOOD" : ["TIM HORTONS", "LE PELE MELE", "LA P'TITE GRENOUILLE", "MAC'S SUSHI", "Shawarma Palace Rideau", "A&W", "CAGE GATINEAU", "STARBUCKS COFFEE"],
             "GROCERIES" : ["DOLLARAMA", "WAL-MART SUPERCENTER", "RUSSELL FOODLAND"], 
             "OTHER": ["IMPERIAL BARBER SHOP", "HAWKINS CAR WASH", "STITCH IT"], 
             "ENTERTAINMENT" : [], 
             "GAS" : ["MR. GAS", "SHELL", "PETROCAN-500"]}

@app.route("/", methods=["POST"])
def getName():
    try:
        name = request.form["name"]
        test.UnitTest().test(name)
    except Exception as e:
        print(e)
    return name


@app.route("/", methods=["GET"])
def sendName():
    return {"name": "bozo cheese"}


@app.route("/file", methods=["POST"])
def getFile():
    f = request.files['file']
    f.save('temp/' + f.filename)
    return 'W'

# sign up endpoint: checks to see if name is unique, and adds user to Users table
@app.route("/signup", methods=["POST"])
def signup():
    name = request.form["name"]
    password = request.form["password"]

    q = User.select().where(User.name == name)
    # username must be unique, if it already exists, return error
    if q.exists():
        return {"body" : "User already exists!", "status" : 400}
    User.create(username=name, password=password)
    return {"body" : "Success", "status" : 200}

# sign in endpoint: checks to see if user exists, and then if passwords match
@app.route("/signin", methods=["POST"])
def signin():
    name = request.form["name"]
    password = request.form["password"]
    user = User.get_or_none(User.username == name)

    if user != None:
        if user.password == password:
            return {"body" : "Login successful", "status" : 200}
        else:
            return {"body" : "Incorrect password, please try again", "status" : 400}

    return {"body" : "Invalid username or password, please try again", "status" : 400}

# endpoint to add all financial information to the user
@app.route("/addinfo", methods=["POST"])
def addInfo():
    name = request.form["name"]

    user = User.get_or_none(User.username == name)
    user.age == request.form["age"]
    user.salary == request.form["salary"]
    user.debt == request.form["debt"]
    return {"body" : "Information updated.", "status" : 200}