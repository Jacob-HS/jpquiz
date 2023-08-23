import "./AnswerHolder.css"

export default function AnswerHolder(props){

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
   {renderAnswers(shuffledAnswers)}
   {props.includeIdk &&
   <div className="multChoiceAnswer idk" key="idk" onClick={()=>props.registerAnswer("idk")}>I don't know</div>
   }
  </div>
  </>);
}