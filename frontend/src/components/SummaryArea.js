import "./SummaryArea.css"

export default function SummaryArea(props){
  let summaryTracker=props.summaryTracker;
  let questionType=props.questionType;
  const renderSummary = s => s.map(summary => <div className={questionType+"SummaryElement "+summary[3]}><p className="summaryQuestion" dangerouslySetInnerHTML={{__html: summary[0]}}></p><p className="summaryAns">{summary[1]}</p>
  <p className="summaryAns">{summary[2]}</p></div>);
  return (<>
    <p id="summaryHeader">Quiz Summary</p>
    <div id="summaryAreaContainer">
      {renderSummary(summaryTracker)}
    </div>


  </>);
}