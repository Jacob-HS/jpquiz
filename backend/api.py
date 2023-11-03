from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random
from flask_sqlalchemy import SQLAlchemy 
import sqlalchemy as sa
from sqlalchemy.sql import text
import os

db=SQLAlchemy()
DB_NAME="jpquiz.db"
app = Flask(__name__, static_folder="../frontend/build", static_url_path="")
CORS(app)
app.config['SECRET_KEY'] = "frick"
app.config["SQLALCHEMY_DATABASE_URI"]="postgresql://nwjvfrtkyviply:12674594f6cac5865af202d24e918f1e9f41a8662043355c932921c1180333a2@ec2-52-6-117-96.compute-1.amazonaws.com:5432/d4aa6667vpdng7"
db.init_app(app)
AnswerTracker= db.Table("answertracker", 
                        db.Column("questionid", db.String(100), primary_key=True),
                        db.Column("correctcount", db.Integer, server_default=text("0")),
                        db.Column("incorrectcount", db.Integer, server_default=text("0"))
                        )

print(os.listdir())
with open("goiryokuQuestions.json", "r", encoding="utf-8") as infile:
    goiryokuQuestions=json.load(infile)
with open("quizList.json", "r", encoding="utf-8") as infile:
    quizList=json.load(infile)
with open("vn5Questions.json", "r", encoding="utf-8") as infile:
    vn5Questions=json.load(infile)
with open("obscurityQuestions.json", "r", encoding="utf-8") as infile:
    obscurityQuestions=json.load(infile)
with open("obscurityPromptsKyouiku.json", "r", encoding="utf-8") as infile:
    obscurityPrompts=json.load(infile)
with open("strokeOrderQuestions.json", "r", encoding="utf-8") as infile:
    strokeOrderQuestions=json.load(infile)
with open("svgjson2.json", "r", encoding="utf-8") as infile:
    svgdict=json.load(infile)
with open("grammarQuestions.json", "r", encoding="utf-8") as infile:
    grammarQuestions=json.load(infile)
with open("n1grammar.json", "r", encoding="utf-8") as infile:
    n1grammar=json.load(infile)
with open("n2grammar.json", "r", encoding="utf-8") as infile:
    n2grammar=json.load(infile)
with open("n3grammar.json", "r", encoding="utf-8") as infile:
    n3grammar=json.load(infile)
with open("n4grammar.json", "r", encoding="utf-8") as infile:
    n4grammar=json.load(infile)
with open("n5grammar.json", "r", encoding="utf-8") as infile:
    n5grammar=json.load(infile)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/quizList')
def quizListBoi():
    return jsonify(quizList)

@app.route('/quizData/<quizId>')
def fetchQuizData(quizId):
    if (quizId=="goiryoku"):
        return generateGoiryokuGame()
    if (quizId=="vn5"):
        return jsonify(vn5Questions)
    if (quizId=="obscurity"):
        return generateObscurityGame()
    if (quizId)=="strokeorder":
        return generateStrokeOrderGame()
    if (quizId in ["gn1","gn2","gn3","gn4","gn5"]):
        return generateGrammarQuiz(quizId[2])
    else:
        print("error")

@app.route('/answerTracker', methods=['POST'])
def answerTracker():
    data = json.loads(request.data)
    QUESTIONID=data["questionid"]
    CORRECT=data["correct"]
    temp= "correctcount" if CORRECT else "incorrectcount"
    query=text(f"UPDATE answertracker SET {temp} = {temp}+1 WHERE questionid='{QUESTIONID}'; COMMIT;")
    with db.engine.connect() as conn:
        result = conn.execute(query)
    
    return "yes"

def generateGoiryokuGame():
    for key in range(7):
        random.shuffle(goiryokuQuestions[str(key+1)])
    return goiryokuQuestions

def generateObscurityGame():
    questions=[["untrackedQuestion", element] for element in random.sample(obscurityPrompts,10)]
    obscurityQuestions["questions"]["1"]=questions
    return obscurityQuestions

def generateStrokeOrderGame():
    kanjis=random.sample(svgdict.keys(), 10)
    questionlist=[]
    for kanji in kanjis:
        question=["untrackedQuestion"]
        svgData=svgdict[kanji]
        strokeCount=svgData.count("<path")
        strokeNumber=random.randrange(strokeCount)+1
        print(strokeNumber)
        START=find_nth(svgData, "<path", strokeNumber)
        question.extend([svgData[0:START]+svgData[START:START+6]+'style="stroke:red" '+svgData[START+6:],str(strokeNumber)])
        questionlist.append(question)
    strokeOrderQuestions["questions"]["1"]=questionlist
    return strokeOrderQuestions

def generateGrammarQuiz(level):
    questions=random.sample(grammarQuestions[level], 10)
    if(level=="1"):
        n1grammar["questions"]["1"]=questions
        return n1grammar
    if(level=="2"):
        n2grammar["questions"]["1"]=questions
        return n2grammar
    if(level=="3"):
        n3grammar["questions"]["1"]=questions
        return n3grammar
    if(level=="4"):
        n4grammar["questions"]["1"]=questions
        return n4grammar
    if(level=="5"):
        n5grammar["questions"]["1"]=questions
        return n5grammar



def find_nth(haystack, needle, n):
    start = haystack.find(needle)
    while start >= 0 and n > 1:
        start = haystack.find(needle, start+len(needle))
        n -= 1
    return start

if __name__ == '__main__':
    app.run(debug=True)