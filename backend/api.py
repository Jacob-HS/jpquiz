from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("goiryokuQuestions.json", "r", encoding="utf-8") as infile:
    goiryokuQuestions=json.load(infile)
with open("quizList.json", "r", encoding="utf-8") as infile:
    quizList=json.load(infile)
print(quizList)

@app.route('/quizList')
def quizListBoi():
    return jsonify(quizList)

@app.route('/quizData/<quizId>')
def fetchQuizData(quizId):
    if (quizId=="goiryoku"):
        return jsonify(goiryokuQuestions)
    else:
        print("error")

if __name__ == '__main__':
    app.run(debug=True)