import React, { useCallback, useState } from "react";
import _ from "lodash";

import "./createStatCardModal.styles.css";
import { loadCoinTickers } from "../../services";

const CreateStatCardModal = (props: any) => {
  //   const [coinList, setCoinList] = useState<any>([]);
  const [tickersList, setTickersList] = useState<any>([]);

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [selectedTick, setSelectedTick] = useState();

  const getCoinTickers = async () => {
    const ordered = await loadCoinTickers(selectedCoin);

    // const response = await fetch(
    //   `https://api.coingecko.com/api/v3/coins/${selectedCoin}/tickers`
    // );
    // const data = await response.json();

    // // setCoinList(data);
    // const pickedMap = _.map(data.tickers, (item) => {
    //   return {
    //     timestamp: item.timestamp,
    //     base: item.base,
    //     target: item.target,
    //     last: item.last,
    //     market: item.market,
    //     coinId: item.coin_id,
    //   };
    // });

    // const ordered = _.chain(pickedMap)
    //   .filter((item) => {
    //     return item.coinId === selectedCoin;
    //   })
    //   .sortBy("timestamp")
    //   .reverse()
    //   .groupBy("target")
    //   .map((item) => {
    //     return item[0];
    //   })
    //   .value();

    setTickersList(ordered);
    setSelectedTick(ordered[0]?.target);
  };

  React.useEffect(() => {
    getCoinTickers();
  }, [selectedCoin]);

  const onSelectedCoin = (event: any) => {
    let index = props.coinList.findIndex((item: any) => {
      return item.id === event.target.value;
    });
    setSelectedCoin(props.coinList[index]?.id);
  };

  const onSelectedTick = (event: any) => {
    setSelectedTick(event.target.value);
  };

  const onCreateHandler = () => {
    let index = tickersList.findIndex((item: any) => {
      return item.target === selectedTick;
    });
    props.onCreateHandler(tickersList[index]);
  };
  return (
    <div className="modal">
      <p className="modal-title">Add New Ticker</p>
      <select
        className="row select coinList"
        value={selectedCoin}
        onChange={onSelectedCoin}
      >
        {props.coinList.map((item: any) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="row select coinList"
        value={selectedTick}
        onChange={onSelectedTick}
      >
        {tickersList.map((item: any) => (
          <option key={item.target} value={item.target}>
            {item.target}
          </option>
        ))}
      </select>
      <div className="modalFooter">
        <button className="btn btn--alt" onClick={props.onCancelClick}>
          Cancel
        </button>
        <button className="btn" onClick={onCreateHandler}>
          Create
        </button>
      </div>
    </div>
  );
};
export default CreateStatCardModal;
