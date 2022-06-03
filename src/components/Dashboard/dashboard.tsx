import StatCardModel from "../../models/statCard.model";
import Backdrop from "../backdrop";
import CreateStatCardModal from "../modals/createStatCardModal";
import StatCard from "../StatCard/statCard";
import {useState} from "react";
import React from "react";
import _ from "lodash";
import {addStatCardToLocalStorage, removeStatCardFromLocalStorage} from "../../services";
import "./dashboard.css"
import {Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

const Dashboard = (props: any) => {
    const [showModal, setShowModal]         = useState(false);
    const [statCardsList, setStatCardsList] = useState(props?.dashboardData.statCards);

    React.useEffect(() => {
        setStatCardsList(props.dashboardData.statCards);
    }, [props?.dashboardData?.statCards]);

    const openNewTickerModal = () => {
        setShowModal(true);
    };

    const addNewStatCard = (newTicker: any) => {
        const title     = `${newTicker.base}/${newTicker.target}`;
        const subTitle  = `${newTicker.market?.name}`;
        const data      = `${newTicker.last}`;
        const base      = `${newTicker.base}`;
        const baseId    = `${newTicker.coinId}`;
        const target    = `${newTicker.target}`;
        const targetId  = `${newTicker.targetId}`;
        let indexBase   = props.coinList.findIndex((item: any) => {
            return item.id === baseId;
        });
        const baseImg   = props.coinList[indexBase].image.thumb;
        let indexTarget = props.coinList.findIndex((item: any) => {
            return item.id === targetId;
        });
        const targetImg = props.coinList[indexTarget]?.image.thumb;

        const newStatCard: StatCardModel = {
            title:     title,
            subTitle:  subTitle,
            data:      data,
            base:      base,
            target:    target,
            baseImg:   baseImg,
            targetImg: targetImg

        };
        const newList                    = [...statCardsList, newStatCard];

        addStatCardToLocalStorage(newStatCard, props.dashboardData.name);

        setStatCardsList(newList);
        props.setDashboardListState(props.dashboardData.name,newList)

        setShowModal(false);
    };

    const deleteStatCard = (statCardToRemove: StatCardModel) => {
        let newStatList = [...statCardsList];
        _.remove(newStatList, {
            title:    statCardToRemove.title,
            subTitle: statCardToRemove.subTitle
        });
        setStatCardsList(newStatList);
        removeStatCardFromLocalStorage(statCardToRemove, props.dashboardData.name)

        props.setDashboardListState(props.dashboardData.name,newStatList)
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
                <div className="row button create-stat-card">
                    <IconButton onClick={openNewTickerModal} className="add-icon">
                        <AddIcon/>
                    </IconButton>
                </div>
            </div>
            {_.isEmpty(statCardsList) ? <div className="empty-state">
                <Typography sx={{fontSize: 22}} variant="subtitle1" color="white" gutterBottom>
                    No Widget To Show.
                </Typography></div> : null}
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
            {showModal && <Backdrop onClick={closeModalHandler}/>}
        </div>
    );
};

export default Dashboard;
