import "./GoiryokuResults.css"
import SummaryArea from "./SummaryArea.js"
import { useState } from "react";
import AnimatedNumber from "animated-number-react";
import { Outlet, Link } from "react-router-dom";
export default function GoiryokuResults(props){
  let comments=[
    "Gotta start somewhere.", //until 1000 words  6 points
    "Not bad...", //until 3000 words?  18 points
    "Now that's what I'm talking about!", // until 6000 words  35 points
    "Dang, you might be able to pass that N1 thing...", //until 10000 words  56 points
    "You must have some killer mnemonics...", // until 15000 words  79 points
    "Now that's what I call impressive.", //until 21000 words 95 points
    "Now THIS guy reads native content.",//until 26000 words  95<x<100
    "日本語上手ですね。" //perfect score 100

  ];
  let commentThresholds=[6,18,35,56,75,95,100];
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  let quizHistory=props.quizHistory;
  let questionTracker=props.questionTracker;
  let summaryTracker=props.summaryTracker;
  console.log(summaryTracker);
  const DANSIZE=[2000,3000,4000,4000,4000,4000,5000]
  const calculateScore = () => {
    let danscore=0;
    let runningscore=0;
    for(let i=0; i<7; i++){
      let dan = quizHistory[i];
      if(dan[0]+dan[1]===0) continue; //skip if no questions were answered for that dan

      danscore=(dan[0]/(dan[0]+dan[1]))*DANSIZE[i];
      runningscore+=danscore;
    }
    let smushed = 100*Math.sin((Math.PI*runningscore*.5)/26000);
    smushed=Math.round(smushed*100)/100;
    return smushed;
  }
  const complete = () => {
    document.getElementById("animatedNumberContainer").style.animationPlayState="running";
    console.log("yes");
  }
  const formatValue = (value) => value.toFixed(2);
  let SCORE=Math.max(calculateScore(),0);
  let commentScore=0;
  for(let i of commentThresholds){
    if (SCORE>=i) commentScore++;
  }
  const retryQuiz = () =>{
    let temp=props.resetQuizInfo();    
    props.retrieveQuizInfo(temp);
  }
  



  return (<>
    <div id="backPanel">
    <p id="scoreHeader">Your Goiryoku Score:</p>
    <div id="animatedNumberContainer">
      <AnimatedNumber value={SCORE} formatValue={formatValue} duration={2000} complete={complete}/>
    </div>
    <div id="commentContainer">
      <p id="comment">{comments[commentScore]}</p>
    </div>
    <div className="buttonHolder">
    <Link to="/about/goiryoku" style={{textDecoration: "none", color : "black"}}>
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