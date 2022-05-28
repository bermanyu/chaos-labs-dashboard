import StatCardModel from "../models/statCard.model";

function StatCard(props: any) {
  const roundData = parseFloat(props.statData.data);
  const bla = Math.round(roundData * 100) / 100;

  return (
    <div className="card row">
      <div className="card-header rows">
        <h2 className="row">{props.statData?.title} </h2>
        <span className="row source">Source: {props.statData?.subTitle}</span>
      </div>
      <h2>{roundData}</h2>
    </div>
  );
}

export default StatCard;
