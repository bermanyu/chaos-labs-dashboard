import React, { useCallback, useState } from "react";

const CreateStatCardModal = (props: any) => {
  const [coinList, setCoinList] = useState<any>([]);

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  const loadCoinList = useCallback(async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const data = await response.json();
    // const defaultValue = data.find((item: any) => {
    //   return item.id === "bitcoin";
    // });

    // setSelectedCoin(defaultValue.id);
    // console.log("default", defaultValue.id);
    console.log("selected", selectedCoin);

    setCoinList(data);

    console.log(data);
  }, []);

  React.useEffect(() => {
    loadCoinList();
  }, [loadCoinList]);

  React.useEffect(() => {
    console.log("selected", selectedCoin);
  }, [selectedCoin]);

  const onSelectedCoin = (event: any) => {
    let index = coinList.findIndex((item: any) => {
      return item.id === event.target.value;
    });

    setSelectedCoin(coinList[index]?.id);
    console.log("selected", selectedCoin);
  };

  const onSubmitHandler = () => {};
  return (
    <div className="modal">
      <form>
        <p>create stat card</p>
        <select
          className="row select"
          value={selectedCoin}
          onChange={onSelectedCoin}
        >
          {coinList.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button className="btn btn--alt" onClick={props.onCancelClick}>
          Cancel
        </button>
        <button className="btn" onClick={onSubmitHandler}>
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateStatCardModal;
