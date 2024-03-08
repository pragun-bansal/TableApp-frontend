import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import IndexPage from './components/IndexPage';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import SideBar from './components/SideBar/SideBar';
import { useState } from 'react';
function App() {

  const [id, setId] = useState("");

  return (
    <Router>
      <SideBar setId={setId} id={id} />
      <Routes>
        <Route path="/" element={ <IndexPage setId={setId} id={id} />} />
        <Route path="/table" element={<Table id={id}/>} />
      </Routes>
    </Router>
  );
}

export default App;
