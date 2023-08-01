import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js"
import MultQuiz from "./pages/MultQuiz.js"
import './index.css';
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:5000/';
export default function App() {
  useEffect(()=>{
    axios.get('/test')
    .then(res=>{
      console.log(res.data);
    });
  },[]);
  const [quizData, updateQuizData] = useState("");
  const retrieveQuizInfo = id =>{
    axios.get('/quizData/'+id)
    .then(res=>{
      console.log(res);
      updateQuizData(res.data);
    });
    console.log("???")
    console.log(quizData);
  }

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home retrieveQuizInfo={retrieveQuizInfo} />}></Route>
        <Route path="/m" element={<MultQuiz/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
