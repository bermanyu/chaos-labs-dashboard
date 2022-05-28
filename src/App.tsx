import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainView from "./components/mainView";
import data from "./data/data.json";
import Dashboard from "./components/dashboard";

function App() {
  const newDataString = localStorage.getItem("dashboard");

  if (newDataString == undefined) {
    const { dashboard } = data;
    // setData(dashboard);

    localStorage.setItem("dashboard", JSON.stringify(dashboard));
  } else {
    // setData(JSON.parse(newDataString));
  }
  const [initalDashboard, setData]: [any, any] = useState(
    newDataString ? JSON.parse(newDataString) : Dashboard
  );

  return (
    <div>
      <MainView initalData={initalDashboard} />
    </div>
  );
}

export default App;
