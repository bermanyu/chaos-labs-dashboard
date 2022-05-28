import StatCardModel from "../models/statCard.model";
import Backdrop from "./backdrop";
import CreateStatCardModal from "./modals/createStatCardModal";
import StatCard from "./statCard";
import { useState } from "react";

const Dashboard = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  const addNewStatCard = () => {
    setShowModal(true);
    const newStatCard: StatCardModel = {
      title: "test",
      subTitle: "test",
      data: "23.1",
    };
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
          onClick={addNewStatCard}
        >
          Add statCard
        </button>
      </div>
      <div className="rows stat-card-wrapper">
        {props.dashboardData.statCards.map((statCard: StatCardModel) => (
          <StatCard key={props.name} className="row" statData={statCard} />
        ))}
      </div>
      {showModal && <CreateStatCardModal onCancelClick={closeModalHandler} />}
      {showModal && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
};

export default Dashboard;
