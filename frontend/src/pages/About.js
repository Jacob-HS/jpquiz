import "./About.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";

export default function About(props){
  
  const navigate = useNavigate();
  useEffect(()=>{
    if((props.quizID)==''){
      navigate('/');
  }}, []);  
  if ((props.quizID)==''){      
    return (<></>);
  }
  let QUIZINFO=props.quizData;

  if (QUIZINFO.quizID === props.quizID){
    return (<>
      <div id="backPanel">
        <p id="titleHeader">{QUIZINFO.quizName}</p>
        <p id="aboutHeader">About</p>
        <p id="aboutContent">{QUIZINFO.quizAbout}</p>
        <div id="adaptiveLevelBox">
        <Link to="/quiz/standard" style={{textDecoration: "none", color : "black"}}>
          <div className="startButton">Let's do it</div>
        </Link>
        </div>
      </div>
    </>);
  }else{
    return (<>
      <div id="backPanel">
        <p id="loadingPlaceholder">Loading quiz...</p>
      </div>
    </>);
  }
  
}