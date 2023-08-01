import "./Home.css"
import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react'
  


export default function Home(props){
  return (<>
    <div id="homeHeaderContainer">
      <p id="homeHeader">JP Quiz</p>
    </div>
    <div id="quizContainer">
      <Link to="/about/goiryoku" style={{textDecoration: "none", color : "black"}}>
        <div className="quizButton" onClick={()=>props.retrieveQuizInfo("goiryoku")}>
          <p className="quizButtonText">Goiryoku</p>
        </div>
      </Link>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 2</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 3</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 4</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 5</p>
      </div>
    </div>
  </>
  )
}