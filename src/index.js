import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import GameEndComponent from "./components/GameComponent/GameEndComponent";
import GameStartComponent from "./components/GameComponent/GameStartComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent";
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route
        index
        element={<HomeComponent/>}
        />

        <Route path='start' element={<GameStartComponent/>}/>
        <Route path='end' element={<GameEndComponent/>}/>
        
      </Route>

      <Route 
      path='*'
      element={<Navigate to='/'/>}
      />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
