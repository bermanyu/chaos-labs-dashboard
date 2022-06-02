import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import './statCard.css'

function StatCard(props: any) {
    const removeCard = () => {
        props.deleteCardFromStatList(props.statData);
    };

    return (
        <div className="card row">
            <div className="card-header rows">
                    <img src={props.statData.baseImg}/>
                    <h2 className="row base">{props.statData?.base} </h2>
                <h1>/</h1>
                    {props.statData?.targetImg ? <img src={props.statData?.targetImg}/> :
                        <div></div>}

                    <h2 className="row">{props.statData?.target}  </h2>

                <span className="row source">Source: {props.statData?.subTitle}</span>
            </div>
            <div className="card-content rows">
                <h2>{props.statData.data}</h2>
                <IconButton onClick={removeCard} className="add-icon">
                    <DeleteIcon/>
                </IconButton>
            </div>

        </div>
    );
}

export default StatCard;
