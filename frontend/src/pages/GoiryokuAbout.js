import "./About.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";

export default function GoiryokuAbout(props){
  
  const navigate = useNavigate();
  useEffect(()=>{
    if((props.about)==''){
      navigate('/');
  }}, []);  
  if ((props.about)==''){
    return (<></>);
  }
  let QUIZINFO=props.about.goiryoku;
  return (<>
    <div id="backPanel">
      <p id="titleHeader">{QUIZINFO.name}</p>
      <p id="aboutHeader">About</p>
      <p id="aboutContent">{QUIZINFO.about}</p>
      <p id="adaptiveDescription">Selecting a wrong answer is heavily penalized. If you are unsure of the answer, it is best to
      select the "I don't know" option to avoid </p>
      <div id="adaptiveLevelBox">
      <Link to="/quiz/goiryoku" style={{textDecoration: "none", color : "black"}}>
        <div className="adaptiveButton" onClick={()=>props.setAdaptiveLevel(0)}>Let's do it</div>
      </Link>
      </div>
    </div>
  </>);
}