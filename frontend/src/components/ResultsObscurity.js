import { Component } from "react";
import "./Results.css"
import SummaryArea from "./SummaryArea.js"
import AnimatedNumber from "animated-number-react";
import { Outlet, Link } from "react-router-dom";

export default function ResultsObscurity(props){
  let summaryTracker=props.summaryTracker;
  let totalPoints=0;
  for (let item of summaryTracker){
    totalPoints+=parseInt(item[2].slice(15));
  }
  const complete = () => {
    document.getElementById("animatedNumberContainer").style.animationPlayState="running";
    console.log("yes");
  }
  const retryQuiz = () =>{
    let temp=props.resetQuizInfo();    
    props.retrieveQuizInfo(temp);
  }
  const formatValue = (value) => value.toFixed(0);
  return (<>
    <div id="backPanel">
    <p id="scoreHeader">Your Score:</p>
    <div id="animatedNumberContainer">
      <AnimatedNumber value={totalPoints} formatValue={formatValue} duration={2000} complete={complete}/>
    </div>
    <div className="buttonHolder">
    <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
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