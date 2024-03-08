import logo from './logo.svg';
import './App.css';
import IndexPage from './components/IndexPage';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import { useState } from 'react';
import Table from './components/Table';
function App() {



  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path="/" element={ <IndexPage s/>} />
        <Route path="/table/:id" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;
