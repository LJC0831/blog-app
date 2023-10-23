import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Header 컴포넌트를 import
import Navigation from './components/Navigation';
import Home from './components/Home'; // 홈 페이지 컴포넌트 import


function App() {
  return ( 
    <div className="App">
      <BrowserRouter> 
      <Header /> {/* Header 컴포넌트를 렌더링 */} 
      <Navigation /> {/* Navigation 컴포넌트를 렌더링 */}
      <main className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      </BrowserRouter>
    </div>
  );
}

export default App;