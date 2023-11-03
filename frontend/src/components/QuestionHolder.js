import "./QuestionHolder.css"

export default function QuestionHolder(props){
  let quizInstructions=props.quizInstructions;
  let TYPE = props.questionType;
  let questionNum=props.questionNum;
  console.log(props.question.length);
    return (<>
    <div className="answerArea">
      <p className="questionNumHeader">Question #{questionNum}</p>
      <p id="instructionHeader"><span id="underlineBoi">{quizInstructions}</span></p>
      <div id="questionContainer">
        <p className={TYPE+"Question "+(props.question.length>50 && "smallBoi")} dangerouslySetInnerHTML={{__html: props.question}}/>
      </div>
      
    </div>
      
    </>);
}