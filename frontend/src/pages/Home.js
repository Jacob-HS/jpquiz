import "./Home.css"
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
  


export default function Home(props){

  useEffect(()=>{
    props.resetQuizInfo();
  },[]);

  return (<>
    <div id="homeHeaderContainer">
      <p id="homeHeader">JP Quiz</p>
    </div>
    <div id="quizContainer">
    <div id="headerContainer">
      <p class="quizHalfHeader">Repeatable</p>
      <p class="quizHalfHeader">Non-Repeatable</p>
    </div>   
      <div id="dynamicContainer" class="quizHalf">
        
        <Link to="/about/goiryoku" style={{textDecoration: "none", color : "black"}}>
          <div className="quizButton" onClick={()=>props.retrieveQuizInfo("goiryoku")}>
            <p className="quizButtonText">Goiryoku</p>
          </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
          <div className="quizButton" onClick={()=>props.retrieveQuizInfo("obscurity")}>
            <p className="quizButtonText">Obscurity</p>
          </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("strokeorder")}>
          <p className="quizButtonText">Stroke Order</p>
        </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("gn1")}>
          <p className="quizButtonText">N1 Grammar</p>
        </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("gn2")}>
          <p className="quizButtonText">N2 Grammar</p>
        </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("gn3")}>
          <p className="quizButtonText">N3 Grammar</p>
        </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("gn4")}>
          <p className="quizButtonText">N4 Grammar</p>
        </div>
        </Link>
        <div class="quizSpacer"/>
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("gn5")}>
          <p className="quizButtonText">N5 Grammar</p>
        </div>
        </Link>
      </div>
      <div id="staticContainer" class="quizHalf">
        <Link to="/about/quiz" style={{textDecoration: "none", color : "black"}}>
          <div className="quizButton" onClick={()=>props.retrieveQuizInfo("vn5")}>
            <p className="quizButtonText">Vanilla's N5 Quiz</p>
          </div>
        </Link>
      </div>
    </div>
  </>
  )
}