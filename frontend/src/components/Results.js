import { Component } from "react";
import "./Results.css"
import SummaryArea from "./SummaryArea.js"
import { Outlet, Link } from "react-router-dom";

export default function Results(props){
  let summaryTracker=props.summaryTracker;
  let totalQuestions=summaryTracker.length;
  let correctAnswers=0;
  for (let item of summaryTracker){
    if(item[3]==="correct") correctAnswers++;
  }
  const retryQuiz = () =>{
    let temp=props.resetQuizInfo();    
    props.retrieveQuizInfo(temp);
  }
  return (<>
    <div id="backPanel">
    <p id="scoreHeader">Your Score:</p>
    <p id="score">{correctAnswers}/{totalQuestions}</p>
    <div className="buttonHolder">
    <Link to="/about/quiz  " style={{textDecoration: "none", color : "black"}}>
      <div className="restartButton" onClick={retryQuiz}>Retry</div>
    </Link> 
    <Link to="/" style={{textDecoration: "none", color : "black"}}>
      <div className="homeButton">Home</div>
    </Link>
    </div>
      <SummaryArea summaryTracker={summaryTracker} questionType={props.questionType}/>
    </div>
  </>);
}