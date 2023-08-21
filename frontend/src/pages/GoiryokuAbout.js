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
      <p id="adaptiveDescription">Since Goiryoku is an adaptive test, we have the option to ballpark you current vocab level before starting.
      This will lower the time it takes to get to questions at your level. So, how many words do you think you know? </p>
      <div id="adaptiveLevelBox">
      <Link to="/quiz/goiryoku" style={{textDecoration: "none", color : "black"}}>
        <div className="adaptiveButton" onClick={()=>props.setAdaptiveLevel(0)}>&lt;2000<br/>N5~N4</div>
      </Link>
      <Link to="/quiz/goiryoku" style={{textDecoration: "none", color : "black"}}>
        <div className="adaptiveButton" onClick={()=>props.setAdaptiveLevel(1)}>2000-6000<br/>N3~N2</div>
      </Link>
      <Link to="/quiz/goiryoku" style={{textDecoration: "none", color : "black"}}>
        <div className="adaptiveButton" onClick={()=>props.setAdaptiveLevel(2)}>&gt;6000<br/>N1+</div>
      </Link>
      </div>
    </div>
  </>);
}