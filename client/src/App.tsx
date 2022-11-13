import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "@mui/material";
import  SettingsIcon  from "@mui/icons-material/Settings";
import { NavBar } from './NavBar/NavBar';
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
