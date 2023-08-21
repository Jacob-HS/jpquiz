import "./QuestionHolder.css"

export default function QuestionHolder(props){
  let STYLE = props.questionStyle;
  if (STYLE =="single"){
    return <p id="singleQuestion">{props.question}</p>
  }
  return <p>Hello bitch</p>
}