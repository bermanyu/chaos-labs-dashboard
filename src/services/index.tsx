import _ from "lodash";
import {useState} from "react";
import DashboardData from "../models/dashboardData.model";
import StatCardModel from "../models/statCard.model";

export const getCoinList = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins");
    return await response.json();
};

export const loadCoinTickers = async (coinId: string,coinList:any) => {
    const response  = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/tickers`
    );
    const data      = await response.json();
    const pickedMap = _.map(data.tickers, (item) => {
        return {
            timestamp: item.timestamp,
            base:      item.base,
            target:    item.target,
            last:      item.last,
            market:    item.market,
            coinId:    item.coin_id,
            targetId:  item.target_coin_id
        };
    });

    const ordered = _.chain(pickedMap)
                     .filter((item) => {
                         return item.coinId === coinId;
                     })
                     .sortBy("timestamp")
                     .reverse()
                     .groupBy("target")
                     .map((item) => {
                         return item[0];
                     })
                     .remove((item)=>{
                         return item.targetId != null;
                     })
                     .value();
    debugger

    return ordered;
};

export const addStatCardToLocalStorage = (
    newStatCard: StatCardModel,
    dashboardName: string
) => {
    const localStorageForChangeString = localStorage.getItem("dashboard");
    const localStroageForChangeParsed = JSON.parse(localStorageForChangeString || "{}");

    const currentDashboard: DashboardData = _.find(localStroageForChangeParsed, {
        name: dashboardName,
    });

    const {statCards} = currentDashboard;
    const newStatList = [...statCards, newStatCard];

    const newDashboardData = _.set(currentDashboard, "statCards", newStatList);

    const itemIndex = _.indexOf(localStroageForChangeParsed, {
        name: dashboardName,
    });

    _.set(
        localStroageForChangeParsed,
        localStroageForChangeParsed[itemIndex],
        newDashboardData
    );

    localStorage.setItem("dashboard", JSON.stringify(localStroageForChangeParsed));
};

export const removeStatCardFromLocalStorage = (
    statCardToRemove: StatCardModel,
    dashboardName: string
) => {
    const localStorageForChangeString = localStorage.getItem("dashboard");
    const localStroageForChangeParsed = JSON.parse(localStorageForChangeString || "{}");

    const currentDashboard: DashboardData = _.find(localStroageForChangeParsed, {
        name: dashboardName,
    });

    const {statCards} = currentDashboard;

    const newStatCards: StatCardModel[] = _.reject(statCards, {
        title:    statCardToRemove.title,
        subTitle: statCardToRemove.subTitle,
    });
    const newDashboardData              = _.set(currentDashboard, "statCards", newStatCards);

    const itemIndex = _.indexOf(localStroageForChangeParsed, {
        name: dashboardName,
    });

    _.set(
        localStroageForChangeParsed,
        localStroageForChangeParsed[itemIndex],
        newDashboardData
    );

    localStorage.setItem("dashboard", JSON.stringify(localStroageForChangeParsed));
};
