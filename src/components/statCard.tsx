import StatCardModel from "../models/statCard.model";

function StatCard(props: any) {
  debugger;
  return (
    <div className="card row">
      <div className="card-header rows">
        <h2 className="row">{props.statData?.title} </h2>
        <span className="row subtitle">{props.statData?.subTitle}</span>
      </div>
      <h2>{props.statData.data}</h2>
    </div>
  );
}

export default StatCard;
