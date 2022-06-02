import DashboardData from "../../models/dashboardData.model";
import DrawerNav from '../Drawer/drawer';


import * as React from "react";
import {useState} from "react";
import  './mainView.css';

import Dashboard from "../Dashboard/dashboard";
import {getCoinList} from "../../services";
import {Box} from '@mui/material';
import _ from 'lodash';


const MainView = (props: any) => {
    const [dashboardsData, setDashboardDataFromLocal] = useState(props.initalData);
    interface mappedList {
        key: string;
        value: string;
    }
    const [selectedDashboard, setSelectedDashboard] = useState(dashboardsData[0]);
    const [selectedDashboardMapped, setSelectedDashboardMapped]= useState<mappedList[]>([]);
    const [dashboardList, setDashboardList]         = useState(dashboardsData);
    const [coinList, setCoinList]                   = useState([]);

    React.useEffect(()=>{
        const newMappedList:mappedList[] = _.map(dashboardList,(item)=>{
            const random = Math.random();
            const newItem:mappedList = {   value:item.name,
                key:`${random}`}
            return newItem
        })

        setSelectedDashboardMapped(newMappedList)

    },[dashboardList])


    const loadCoinList = React.useCallback(async () => {
        const coinList: any = await getCoinList();
        setCoinList(coinList);
    }, []);

    React.useEffect(() => {
        loadCoinList();
    }, [loadCoinList]);

    const onDashboardSelect = (dashboardName: any) => {
        let index = dashboardList.findIndex((item: DashboardData) => {
            return item.name === dashboardName;
        });

        setSelectedDashboard(dashboardList[index]);
    };

    function addNewDashboard(newName:string) {
        const newItem: DashboardData = {
            name:      newName,
            statCards: [],
        };
        const newList                = [...dashboardList, newItem];

        setDashboardList((prevItems: any) => {
            return [...prevItems, newItem];
        });
        localStorage.setItem("dashboard", JSON.stringify(newList));
        setSelectedDashboard(newItem);
    }

    return (
        <div>
            <Box  className="header">
                <DrawerNav className="drawer" dashboardList={selectedDashboardMapped} onDashboardAdd={addNewDashboard} ondashboardSelect={onDashboardSelect}/>
                <h1 className="main-title">Chaos Labs Dashboads Viewers</h1>
            </Box>

            <Dashboard dashboardData={selectedDashboard} coinList={coinList}></Dashboard>
        </div>
    );
};

export default MainView;
