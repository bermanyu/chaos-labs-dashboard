import StatCardModel from "../models/statCard.model";
import DashboardData from "../models/dashboardData.model";
import * as React from "react";
import { useState } from "react";

import Dashboard from "./dashboard";
import { getCoinList } from "../services/index";

const statCard1: StatCardModel = {
  title: "BTC/ETH",
  subTitle: "Source: coinBase",
  data: "17.3",
};

const MainView = (props: any) => {
  const [dashboardsData, setDashboardDataFromLocal] = useState(props.initalData);

  const [selectedDashboard, setSelectedDashboard] = useState(dashboardsData[0]);
  const [dashboardList, setDashboardList] = useState(dashboardsData);
  const [coinList, setCoinList] = useState([]);

  const loadCoinList = React.useCallback(async () => {
    const coinList: any = await getCoinList();
    setCoinList(coinList);
  }, []);

  React.useEffect(() => {
    loadCoinList();
  }, [loadCoinList]);

  const onDashboardSelect = (event: any) => {
    let index = dashboardList.findIndex((item: DashboardData) => {
      return item.name === event.target.value;
    });

    setSelectedDashboard(dashboardList[index]);
  };

  function addNewDashboard() {
    const newItem: DashboardData = {
      name: "dashboard" + (dashboardList.length + 1),
      statCards: [],
    };
    const newList = [...dashboardList, newItem];
    // call async function to update the server
    // get the return value from the server and update set Items
    setDashboardList((prevItems: any) => {
      return [...prevItems, newItem];
    });
    localStorage.setItem("dashboard", JSON.stringify(newList));
    setSelectedDashboard(newItem);
  }

  return (
    <div className="main-view">
      <h1>Chaos Labs Dashboads Viewers</h1>
      <h3>Please selected your Dashboard</h3>
      <div className="rows dashboards-header">
        <select
          className="row select"
          value={selectedDashboard.name}
          onChange={onDashboardSelect}
        >
          {dashboardList.map((item: DashboardData) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <button className="row, button create-dashboard" onClick={addNewDashboard}>
          Create new dashboard
        </button>
      </div>

      <Dashboard dashboardData={selectedDashboard} coinList={coinList}></Dashboard>
    </div>
  );
};

export default MainView;
