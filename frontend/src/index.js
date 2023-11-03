import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js"
import MultQuiz from "./pages/MultQuiz.js"
import GoiryokuAbout from "./pages/GoiryokuAbout.js"
import GoiryokuQuiz from "./pages/GoiryokuQuiz.js"
import StandardQuiz from "./pages/StandardQuiz.js"
import About from "./pages/About.js"
import './index.css';
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:5000/';
export default function App() {
  const [quizData, updateQuizData] = useState("");
  const [currQuizID, updateCurrQuizID] = useState("")
  const [adaptiveLevel, updateAdaptiveLevel] = useState(0);
  useEffect(() => {console.log("recieved");}, [quizData]);
  const retrieveQuizInfo = id =>{
    updateCurrQuizID((prev)=>id);
    axios.get('/quizData/'+id)
    .then(res=>{
      updateQuizData((r)=>res.data);
      console.log("done");
    });
    
  }

  const runAnswerTracker = ( tempid, tempcorrect) =>{
    axios.post('/answerTracker', { questionid: tempid, correct: tempcorrect});
  }

  const resetQuizInfo = () =>{
    let temp = currQuizID;
    updateQuizData("");
    updateCurrQuizID("");
    return temp;
  }
  const setAdaptiveLevel = level =>{
    updateAdaptiveLevel(l=>level);
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home retrieveQuizInfo={retrieveQuizInfo} resetQuizInfo={resetQuizInfo}/>}></Route>
        <Route path="/about/goiryoku" element={<GoiryokuAbout setAdaptiveLevel={setAdaptiveLevel} quizData={quizData} quizID={currQuizID}/>}></Route>
        <Route path="/quiz/goiryoku" element={<GoiryokuQuiz adaptiveLevel={adaptiveLevel} quizData={quizData} quizID={currQuizID} resetQuizInfo={resetQuizInfo} runAnswerTracker={runAnswerTracker} retrieveQuizInfo={retrieveQuizInfo} />}></Route>
        <Route path="/about/quiz" element={<About quizData={quizData} quizID={currQuizID} />}></Route>
        <Route path="/quiz/standard" element={<StandardQuiz quizData={quizData} quizID={currQuizID} retrieveQuizInfo={retrieveQuizInfo} runAnswerTracker={runAnswerTracker} resetQuizInfo={resetQuizInfo}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
