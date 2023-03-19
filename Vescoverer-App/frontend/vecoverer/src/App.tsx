import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import Home from './components/Home';

const App = () => {


  const [vegan, setVegan] = useState(false)
  const [shake, setShake] = useState(false);

  const isVegan = () => {
    if (!vegan) {
      console.log("Hello world");
      setShake(true);
      setTimeout(() => setShake(false), 2000);
    }
  }

  const checkIfVegan = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, checked } = e.target

    setVegan(checked)
    localStorage.setItem("isVegan", JSON.stringify(checked))

  }

  return (
    <div className="container bg-transparent">
      <Home
        callback={isVegan}
        handleChange={checkIfVegan}
        shake={shake}
        isVegan={vegan}
      />
    </div>

  );
}

export default App;
