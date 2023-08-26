import "./GoiryokuQuiz.css"
import QuestionHolder from "../components/QuestionHolder.js"
import AnswerHolder from "../components/AnswerHolder.js"
import GoiryokuResults from "../components/GoiryokuResults.js"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export default function GoiryokuQuiz(props){
  const [currDan, updateCurrDan] = useState(props.adaptiveLevel);
  const [quizHistory, quizHistoryUpdater] = useState([[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]) //number of correct,incorrect per dan
  const [questionTracker, questionTrackerUpdater] = useState([0,0,0,0,0,0,0]);
  const [finished, finishedUpdater] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    if((props.quizData)==''){
      navigate('/');
  }}, []);  
  if ((props.quizData)==''){
    return (<></>);
  }
 
  const getNextQuestion = () =>{
    return props.quizData[String(currDan+1)][questionTracker[currDan]]
  };

  let currQuestion=getNextQuestion();
  console.log(questionTracker);
  console.log(quizHistory);
  const registerAnswer = ans =>{
    let ff = [...questionTracker];
    ff[currDan]+=1;
    questionTrackerUpdater(prev=>ff);
    let temp = [...quizHistory];
    if(ans === currQuestion[1]){
      console.log("you got it right!");
      temp[currDan][0]++;
      quizHistoryUpdater( prev => temp);

    }else if(ans==="idk"){
      console.log("you got it wrong!");
      temp[currDan][1]++;
    }else{
      console.log("you got it wrong!");
      temp[currDan][1]+=1;
      temp[currDan][0]-=.33;
      quizHistoryUpdater( prev => temp)
    }
    let currDanQuestionCount=questionTracker[currDan];
    let correctPercent = (quizHistory[currDan][0]/(quizHistory[currDan][0]+quizHistory[currDan][1]))*100;
    console.log(currDanQuestionCount);
    console.log(correctPercent);

    //no dan updating until 5 questions answered. 15 questions on the same dan and you're done. 
    if (currDanQuestionCount<4) return;
    if (currDanQuestionCount>13) finishedUpdater(prev=>true);
    if (correctPercent > (84 - Math.min(currDanQuestionCount,10)) && currDan<6){
      updateCurrDan(c=>c+1);
      return;
    }
    if (correctPercent < 31 && currDan>0){
      updateCurrDan(c=>c-1);
    }

  }
    console.log(currQuestion);
    if (finished){
      return (<>
        <GoiryokuResults quizHistory={quizHistory} questionTracker={questionTracker}/>
      </>);
    }else{
    return (<>
      <p id="instructionHeader">Select the English word which most closely fits the Japanese.</p>
      <QuestionHolder question={currQuestion[0]} questionStyle="single"/>
      <AnswerHolder answerList={currQuestion.slice(1)} registerAnswer={registerAnswer} includeIdk="1"/>
    </>);
    }
  
}