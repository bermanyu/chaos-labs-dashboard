import StatCard from "./statCard";
import StatCardModel from "../models/statCard.model";
import DashboardData from "../models/dashboardData.model";
import data from "../data/data.json";
import * as React from "react";
import { useState } from "react";

import Dashboard from "./dashboard";

const statCard1: StatCardModel = {
  title: "BTC/ETH",
  subTitle: "Source: coinBase",
  data: "17.3",
};

const MainView = (props: any) => {
  // React.useEffect(() => {
  //   const newDataString = localStorage.getItem("dashboard");
  //   const dashboardsData = JSON.parse(newDataString || "{}");
  //   setDashboardDataFromLocal(dashboardsData);
  // }, []);

  const [dashboardsData, setDashboardDataFromLocal] = useState(
    props.initalData
  );

  const [selectedDashboard, setSelectedDashboard] = useState(dashboardsData[0]);
  const [items, setItems] = useState(dashboardsData);

  const onDashboardSelect = (event: any) => {
    let index = items.findIndex((item: DashboardData) => {
      return item.name === event.target.value;
    });

    setSelectedDashboard(items[index]);
  };

  function addNewDashboard() {
    const newItem: DashboardData = {
      name: "dashboard" + (items.length + 1),
      statCards: [],
    };
    const newList = [...items, newItem];
    // call async function to update the server
    // get the return value from the server and update set Items
    setItems((prevItems: any) => {
      return [...prevItems, newItem];
    });
    localStorage.setItem("dashboard", JSON.stringify(newList));
  }

  return (
    <div className="main-view">
      <h1>Chaos Labs Dashboads Viewrs</h1>
      <h3>Please selected your Dashboard</h3>
      <div className="rows dashboards-header">
        <select
          className="row select"
          value={selectedDashboard.name}
          onChange={onDashboardSelect}
        >
          {items.map((item: DashboardData) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <button
          className="row, button create-dashboard"
          onClick={addNewDashboard}
        >
          Create new dashboard
        </button>
      </div>

      <Dashboard dashboardData={selectedDashboard}></Dashboard>
    </div>
  );
};

export default MainView;
