import "./GoiryokuQuiz.css"
import QuestionHolder from "../components/QuestionHolder.js"
import AnswerHolder from "../components/AnswerHolder.js"
import { useState, useEffect } from 'react'

export default function GoiryokuQuiz(props){
  let questionList=props.quizData;
  let i=0;
  const [currQuestionNum, updateCurrQuestionNum] = useState(0);
  let currQuestion=questionList["1"][currQuestionNum]
  const registerAnswer = ans =>{
    if(ans == currQuestion[1]){
      console.log("you got it right!");
    }else{
      console.log("you got it wrong!");
    }
    i++;
    updateCurrQuestionNum((c)=>c+1);
  }

  return (<>
    <p id="instructionHeader">Select the English word which most closely fits the Japanese.</p>
    <QuestionHolder question={currQuestion[0]} questionStyle="single"/>
    <AnswerHolder answerList={currQuestion.slice(1)} registerAnswer={registerAnswer}/>
  </>);
}