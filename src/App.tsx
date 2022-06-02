import React, { useState } from "react";
import "./App.css";
import MainView from "./components/MainView/mainView";
import data from "./data/data.json";
import Dashboard from "./components/Dashboard/dashboard";


function App() {
  const newDataString = localStorage.getItem("dashboard");

  if (newDataString == undefined) {
    const { dashboard } = data;

    localStorage.setItem("dashboard", JSON.stringify(dashboard));
  }
  const [initialDashboard, setData]: [any, any] = useState(
    newDataString ? JSON.parse(newDataString) : Dashboard
  );

  return (
    <div>
         <MainView initalData={initialDashboard} />
    </div>
  );
}

export default App;
