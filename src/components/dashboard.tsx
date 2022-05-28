import StatCardModel from "../models/statCard.model";
import Backdrop from "./backdrop";
import CreateStatCardModal from "./modals/createStatCardModal";
import StatCard from "./statCard";
import { useCallback, useState } from "react";
import React from "react";
import DashboardData from "../models/dashboardData.model";
import _ from "lodash";

const Dashboard = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [statCardsList, setStatCardsList] = useState(
    props.dashboardData.statCards
  );
  React.useEffect(() => {
    setStatCardsList(props.dashboardData.statCards);
  }, [props.dashboardData.statCards]);

  const loadCoinList = useCallback(async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const data = await response.json();

    setCoinList(data);

    console.log(data);
  }, []);

  React.useEffect(() => {
    loadCoinList();
  }, [loadCoinList]);

  const openNewTickerModal = () => {
    setShowModal(true);
  };

  const addNewStatCard = (newTicker: any) => {
    const title = `${newTicker.base}/${newTicker.target}`;
    const subTitle = `${newTicker.market?.name}`;
    const data = `${newTicker.last}`;
    const newStatCard: StatCardModel = {
      title: title,
      subTitle: subTitle,
      data: data,
    };
    const newList = [...statCardsList, newStatCard];

    updateLocalStorage(newStatCard, newList);

    setStatCardsList(newList);
    setShowModal(false);
  };

  const updateLocalStorage = (
    newStatCard: StatCardModel,
    newList: StatCardModel[]
  ) => {
    const localStorageForChangeString = localStorage.getItem("dashboard");
    const localStroageForChangeParsed = JSON.parse(
      localStorageForChangeString || "{}"
    );

    const currentDashboard: DashboardData = _.find(
      localStroageForChangeParsed,
      { name: props.dashboardData.name }
    );
    const currentStatCards = _.get(currentDashboard, "statCards");
    const newStatList = [...currentStatCards, newStatCard];
    const newDashboardData = _.set(currentDashboard, "statCards", newStatList);

    const itemIndex = _.indexOf(localStroageForChangeParsed, {
      name: props.dashboardData.name,
    });

    _.set(
      localStroageForChangeParsed,
      localStroageForChangeParsed[itemIndex],
      newDashboardData
    );

    localStorage.setItem(
      "dashboard",
      JSON.stringify(localStroageForChangeParsed)
    );
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="rows dashboard-header">
        <h1 className="row dashboard-header title">
          {props.dashboardData?.name}
        </h1>
        <button
          className="row, button create-stat-card"
          onClick={openNewTickerModal}
        >
          Add statCard
        </button>
      </div>
      <div className="rows stat-card-wrapper">
        {statCardsList.map((statCard: StatCardModel) => (
          <StatCard className="row" statData={statCard} />
        ))}
      </div>
      {showModal && (
        <CreateStatCardModal
          coinList={coinList}
          onCreateHandler={addNewStatCard}
          onCancelClick={closeModalHandler}
        />
      )}
      {showModal && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default Dashboard;
