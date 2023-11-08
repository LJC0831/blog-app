import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header'; // Header 컴포넌트를 import
import Navigation from './components/Navigation';
import Intro from './components/Intro'; // 홈 페이지 컴포넌트 import
import Vuelist from './components/Vuelist';
import ReactList from './components/ReactList';
import NodejsList from './components/NodejsList';
import MariadbList from './components/MariadbList';
import EtcList from './components/EtcList';
import BoardWrite from './components/BoardWrite';


 

function App() {
  return ( 
    <div className="App">
      <Helmet>
        <title>test</title>
      </Helmet>
      <BrowserRouter> 
      <Header /> 
      <div className="main-container">
        <Navigation /> 
        <main>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/board/vue" element={<Vuelist />} />
            <Route path="/board/react" element={<ReactList />} />
            <Route path="/board/nodejs" element={<NodejsList />} />
            <Route path="/board/mariadb" element={<MariadbList />} />
            <Route path="/board/etc" element={<EtcList />} />
            <Route path="/board/:id/:privew_content" element={<BoardWrite />}/>
            <Route path="/board/write/:id" element={<BoardWrite />} />
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
