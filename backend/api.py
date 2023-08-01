from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open("goiryokuQuestions.json", "r", encoding="utf-8") as infile:
    goiryokuQuestions=json.load(infile)

print("fuck")
@app.route('/test')
def testboi():
    return {"hello": 123}

@app.route('/quizData/<quizId>')
def fetchQuizData(quizId):
    if (quizId=="goiryoku"):
        print(goiryokuQuestions)

        return jsonify(goiryokuQuestions)
    else:
        print("error")

if __name__ == '__main__':
    app.run(debug=True)