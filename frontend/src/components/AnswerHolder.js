import "./AnswerHolder.css"
import React, {useEffect} from 'react';

export default function AnswerHolder(props){
  console.log(props.answerList);
  useEffect(()=>{
    if(props.answerType === "free"){
      document.getElementById("freeAnswer").focus();
    }
  });

  function handleThing(event){
    if(event.key=="Enter"){
      if(document.getElementById("freeAnswer").value==="") return;
      props.registerAnswer(document.getElementById("freeAnswer").value);
      document.getElementById("freeAnswer").value="";
    }
  }

  useEffect(()=>{
    if(props.answerType==="free"){
      document.getElementById("freeAnswer").addEventListener("keydown",handleThing);
      console.log("hereboi")
    }
    return () => {
      if(document.querySelectorAll("#freeAnswer").length > 0){
        document.getElementById("freeAnswer").removeEventListener("keydown",handleThing);
      }
    }
    
  },[props.registerAnswer]);
    

  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 
  let ANSWERLIST=props.answerList;
  const shuffledAnswers=shuffle([...ANSWERLIST]);
  let ANSWER=shuffledAnswers.indexOf(ANSWERLIST[0]);
  const renderAnswers = (s) => s.map(ans => <div className="multChoiceAnswer" key={ans} onClick={()=>props.registerAnswer(ans)}>{ans}</div>);


  return (<>
  <div id="answerContainer">
  {props.answerType==="multChoice" && renderAnswers(shuffledAnswers)};
  {props.answerType==="free" && <input className="freeAnswer" type="text" id="freeAnswer" name="answer" placeholder="答え" autoComplete="off"></input>}
  {props.includeIdk === "yes" &&
   <div className="multChoiceAnswer idk" key="idk" onClick={()=>props.registerAnswer("idk")}>I don't know</div>
  }
  </div>
  </>);
}