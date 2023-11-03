import "./About.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { Outlet, Link } from "react-router-dom";

export default function GoiryokuAbout(props){
  
  const navigate = useNavigate();
  useEffect(()=>{
    if((props.quizID)==''){
      navigate('/');
  }}, []);  
  if ((props.quizID)==''){      
    return (<></>);
  }
  let QUIZINFO=props.quizData;
  console.log(props.quizData.quizID);
  console.log(props.quizID);

  if (QUIZINFO.quizID === props.quizID){
    return (<>
      <div id="backPanel">
        <p id="titleHeader">{QUIZINFO.quizName}</p>
        <p id="aboutHeader">About</p>
        <p id="aboutContent">{QUIZINFO.quizAbout}</p>
        <p id="adaptiveDescription">Selecting a wrong answer is heavily penalized. If you are unsure of the answer, it is best to
        select the "I don't know" option to avoid the score penalty.</p>
        <div id="adaptiveLevelBox">
        <Link to="/quiz/goiryoku" style={{textDecoration: "none", color : "black"}}>
          <div className="adaptiveButton" onClick={()=>props.setAdaptiveLevel(0)}>Let's do it</div>
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