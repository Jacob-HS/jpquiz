import "./Home.css"
import { Outlet, Link } from "react-router-dom";
export default function Home(){
  return (<>
    <div id="homeHeaderContainer">
      <p id="homeHeader">JP Quiz</p>
    </div>
    <div id="quizContainer">
      <Link to="/m" style={{textDecoration: "none", color: "black"}}>
        <div className="quizButton">
          <p className="quizButtonText">Test quiz</p>
        </div>
      </Link>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 2</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 3</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 4</p>
      </div>
      <div className="quizButton">
        <p className="quizButtonText">Test quiz 5</p>
      </div>
    </div>
  </>
  )
}