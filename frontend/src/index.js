import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js"
import MultQuiz from "./pages/MultQuiz.js"
import GoiryokuAbout from "./pages/GoiryokuAbout.js"
import GoiryokuQuiz from "./pages/GoiryokuQuiz.js"
import './index.css';
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:5000/';
export default function App() {
  const [quizData, updateQuizData] = useState("");
  const [quizAbout, updateQuizAbout] = useState("");
  const [adaptiveLevel, updateAdaptiveLevel] = useState(0);
  useEffect(()=>{
    axios.get('/quizList')
    .then(res=>{
      updateQuizAbout((r)=>res.data);
    });
  },[]);
  useEffect(() => {console.log(quizData);}, [quizData]);
  const retrieveQuizInfo = id =>{
    axios.get('/quizData/'+id)
    .then(res=>{
      updateQuizData((r)=>res.data);
    });
  }
  const setAdaptiveLevel = level =>{
    updateAdaptiveLevel(l=>level);
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home retrieveQuizInfo={retrieveQuizInfo} />}></Route>
        <Route path="/about/goiryoku" element={<GoiryokuAbout about={quizAbout} setAdaptiveLevel={setAdaptiveLevel}/>}></Route>
        <Route path="/quiz/goiryoku" element={<GoiryokuQuiz adaptiveLevel={adaptiveLevel} quizData={quizData}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
