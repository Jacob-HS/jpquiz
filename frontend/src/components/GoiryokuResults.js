import "./GoiryokuResults.css"

export default function GoiryokuResults(props){
  let quizHistory=props.quizHistory;
  let questionTracker=props.questionTracker;
  const DANSIZE=[2000,3000,4000,4000,4000,4000,5000]

  const calculateScore = () => {
    let danscore=0;
    let runningscore=0;
    for(let i=0; i<7; i++){
      let dan = quizHistory[i];
      if(dan[0]+dan[1]===0) continue; //skip if no questions were answered for that dan

      danscore=(dan[0]/(dan[0]+dan[1]))*DANSIZE[i];
      runningscore+=danscore;
    }
    let smushed = 100*Math.sin((Math.PI*runningscore*.5)/26000);
    smushed=Math.round(smushed*100)/100;
    return smushed;
  }

  let SCORE=calculateScore();




  return (<>
    <div id="backPanel">
      <p style={{"textAlign":"center", "fontSize": "5vw"}}>{SCORE}</p>
    </div>
  </>);
}