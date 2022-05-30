import StatCardModel from "../models/statCard.model";
import Backdrop from "./backdrop";
import CreateStatCardModal from "./modals/createStatCardModal";
import StatCard from "./statCard";
import { useState } from "react";
import React from "react";
import _ from "lodash";
import { updateLocalStorage } from "../services";

const Dashboard = (props: any) => {
  const [showModal, setShowModal] = useState(false);
  const [statCardsList, setStatCardsList] = useState(props?.dashboardData.statCards);

  React.useEffect(() => {
    setStatCardsList(props.dashboardData.statCards);
  }, [props.dashboardData.statCards]);
  React.useEffect(() => {}, [setStatCardsList]);

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

    updateLocalStorage(newStatCard, props.dashboardData.name);

    setStatCardsList(newList);
    setShowModal(false);
  };

  const deleteStatCard = (title: string, subTitle: string) => {
    console.log("before", statCardsList);
    let newStatList = [...statCardsList];
    _.remove(newStatList, { title: title, subTitle: subTitle });
    setStatCardsList(newStatList);

    console.log("after", statCardsList);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const getRandomNum = () => {
    return Math.random() * 100;
  };

  return (
    <div className="dashboard-wrapper">
      <div className="rows dashboard-header">
        <h1 className="row dashboard-header title">{props.dashboardData?.name}</h1>
        <button className="row, button create-stat-card" onClick={openNewTickerModal}>
          Add statCard
        </button>
      </div>
      <div className="rows stat-card-wrapper">
        {statCardsList.map((statCard: StatCardModel) => (
          <StatCard
            key={statCard.title + getRandomNum()}
            className="row"
            statData={statCard}
            deleteCardFromStatList={deleteStatCard}
          />
        ))}
      </div>
      {showModal && (
        <CreateStatCardModal
          coinList={props.coinList}
          onCreateHandler={addNewStatCard}
          onCancelClick={closeModalHandler}
        />
      )}
      {showModal && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default Dashboard;
