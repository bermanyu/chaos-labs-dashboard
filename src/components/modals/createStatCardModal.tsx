import React, { useState } from "react";
import Button from '@mui/material/Button';


import "./createStatCardModal.styles.css";
import { loadCoinTickers } from "../../services";

const CreateStatCardModal = (props: any) => {
    const [tickersList, setTickersList] = useState<any>([]);

    const [selectedCoinId, setSelectedCoinId] = useState("bitcoin");
    const [selectedTick, setSelectedTick] = useState();

    const getCoinTickers = async () => {
        const ordered = await loadCoinTickers(selectedCoinId);

        setTickersList(ordered);
        setSelectedTick(ordered[0]?.target);
    };

    React.useEffect(() => {
        getCoinTickers();
    }, [selectedCoinId]);

    const onSelectedCoin = (event: any) => {
        let index = props.coinList.findIndex((item: any) => {
            return item.id === event.target.value;
        });
        setSelectedCoinId(props.coinList[index]?.id);
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
                value={selectedCoinId}
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
                <Button  onClick={props.onCancelClick}>
                    Cancel
                </Button>
                <Button  variant="contained" onClick={onCreateHandler}>
                    Create
                </Button>
            </div>
        </div>
    );
};
export default CreateStatCardModal;
