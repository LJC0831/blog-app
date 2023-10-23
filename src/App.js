import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Header 컴포넌트를 import
import Navigation from './components/Navigation';
import Intro from './components/Intro'; // 홈 페이지 컴포넌트 import
 

function App() {
  return ( 
    <div className="App">
      <BrowserRouter> 
      <Header /> 
      <div className="main-container">
        <Navigation /> 
        <main>
          <Routes>
            <Route path="/" element={<Intro />} />
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
