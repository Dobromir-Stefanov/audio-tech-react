import React from 'react'
import { BrowserRouter as Router, Route, Routes }
  from 'react-router-dom';
import Header from './utils/Header';
import './assets/app.css'
import { SiteSection } from './styles';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Header />
      <SiteSection>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router>
      </SiteSection>
    </>
  );
}

export default App;