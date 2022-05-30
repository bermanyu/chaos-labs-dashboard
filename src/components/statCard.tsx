import { findIndex } from "lodash";

function StatCard(props: any) {
  const removeCard = () => {
    props.deleteCardFromStatList(props.statData.title, props.statData?.subTitle);
  };

  return (
    <div className="card row">
      <div className="card-header rows">
        <h2 className="row">{props.statData?.title} </h2>
        <span className="row source">Source: {props.statData?.subTitle}</span>
      </div>
      <h2>{props.statData.data}</h2>
      <button onClick={removeCard}>Delete</button>
    </div>
  );
}

export default StatCard;
