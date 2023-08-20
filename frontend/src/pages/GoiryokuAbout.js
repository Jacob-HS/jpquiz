import "./About.css"

export default function GoiryokuAbout(props){
  console.log(props.about.goiryoku);
  let QUIZINFO=props.about.goiryoku;
  return (<>
    <div id="backPanel">
      <p id="titleHeader">{QUIZINFO.name}</p>
    </div>
  </>);
}