import "./StandardQuiz.css"
import QuestionHolder from "../components/QuestionHolder.js"
import AnswerHolder from "../components/AnswerHolder.js"
import Results from "../components/Results.js"
import ResultsObscurity from "../components/ResultsObscurity.js"
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";


export default function StandardQuiz(props){
  let quizData=props.quizData;
  let sectionCount=quizData.sectionCount;
  const [summaryTracker, summaryTrackerUpdater] = useState([]);
  const [currSection, updateCurrSection] = useState(1);
  const [currQuestionNum, updateCurrQuestionNum] = useState(0);
  const [questionCounter, updateQuestionCounter] = useState(1);
  const [finished, finishedUpdater] = useState(false);
  const currQuestion = useRef([]);
  const navigate = useNavigate();
  const runAnswerTracker=props.runAnswerTracker;
  useEffect(()=>{
    if((props.quizData)==''){
      navigate('/');
    if ((props.quizData)==''){
      return (<></>);
    }
  
  }}, []);  
  if ((props.quizData)==''){
    return (<></>);
  }
  console.log(props.quizData);  
  const calculatePoints = rawScore =>{
    switch (true){
      case (rawScore>21000):
        return 10;
      case (rawScore>19000):
        return 9;
      case (rawScore>17000):
        return 8;
      case (rawScore>15000):
        return 7;
      case (rawScore>13000):
        return 6;
      case (rawScore>11000):
        return 5;
      case (rawScore>9000):
        return 4;
      case (rawScore>7000):
        return 3;
      case (rawScore>4000):
        return 2;
      case (rawScore>1000):
        return 1;
    }
    return 0;
  }
  currQuestion.current= quizData["questions"][String(currSection)][currQuestionNum];
  const registerAnswer = ans =>{
    if(quizData.quizID==="obscurity"){
      handleObscurity(ans);
    }
    else{
      updateQuestionCounter(prev=>prev+1);
      handleStandardQuiz(ans);
    }
  }
  const handleObscurity = ans => {
    let summaryTemp=[...summaryTracker];
    if (ans !=="idk"){
      if (!(ans.includes(currQuestion.current[1]))){
        return;
      }
      if (!(ans in (quizData.words))){
        return;
      }
    }
    let points;
    if(ans==="idk") points=0;
    else points = calculatePoints(quizData.words[ans]);
    summaryTemp.push([currQuestion.current[1],"Your answer: "+ans,"Awarded points: "+points, ans!=="idk"?"correct":"incorrect"]);
    summaryTrackerUpdater(prev=>summaryTemp);
    console.log("here: "+ quizData["questions"][String(currSection)].length+" "+currQuestionNum);
    if(quizData["questions"][String(currSection)].length > (currQuestionNum+1)){
      updateCurrQuestionNum(prev=>prev+1);
      updateQuestionCounter(prev=>prev+1);
      return;
    }
    console.log("finished!");
    finishedUpdater(prev=>true);
    
  }


  const handleStandardQuiz = ans => {
    let summaryTemp=[...summaryTracker];
    runAnswerTracker(currQuestion.current[0], currQuestion.current[2]===ans)
    summaryTemp.push([currQuestion.current[1],"Correct answer: "+currQuestion.current[2],"Your answer: "+ans, currQuestion.current[2]===ans?"correct":"incorrect"]);
    summaryTrackerUpdater(prev=>summaryTemp);
    //go to next question
    if(quizData["questions"][String(currSection)].length > (currQuestionNum+1)){
      updateCurrQuestionNum(prev=>prev+1);
      return;
    }
    if(currSection<sectionCount){
      updateCurrSection(prev=>prev+1);
      updateCurrQuestionNum(prev=>0);
      return;
    }

    finishedUpdater(prev=>true)
  }


  if (finished){
    if(quizData.quizID==="obscurity"){
      return <ResultsObscurity summaryTracker={summaryTracker} questionType={props.quizData.questionType} retrieveQuizInfo={props.retrieveQuizInfo} resetQuizInfo={props.resetQuizInfo}/>;
    }
    else{
      return <Results summaryTracker={summaryTracker} questionType={props.quizData.questionType} retrieveQuizInfo={props.retrieveQuizInfo} resetQuizInfo={props.resetQuizInfo}/>;
    }
  }else{
  return (<>
    <QuestionHolder question={currQuestion.current[1]} questionNum = {questionCounter} questionType={quizData.questionType} quizInstructions={quizData["quizInstructions"][currSection-1]}/>
    <AnswerHolder answerList={currQuestion.current.slice(3)} answerType={quizData.answerType} registerAnswer={registerAnswer} includeIdk={quizData.includeIdk}/>
  </>);
  }
}