import axios from "axios";
import React, { useEffect, useState } from "react";
import FighterCard from "../../components/FighterCard";
import "./styles.scss";

type dataResult = {
  fname: string;
  lname: string;
  height: number;
  weight: number;
  win: number;
  username: string;
};

const PickFight = () => {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState<dataResult[] | null>(null);
  const [increment, setIncrement] = useState<number>(0);

  const getFighters = async () => {
    const headerSettings = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await axios({
        url: "http://localhost:9000/fight/all-fighters",
        method: "GET",
        headers: headerSettings,
      });
      setData(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getFighters();
  }, []);

  return (
    <div className="container">
      {data ? <FighterCard data={data[0]} /> : null}
    </div>
  );
};

export default PickFight;
