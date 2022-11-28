import axios from "axios";
import React, { useEffect, useState } from "react";
import "./styles.scss";

const PickFight = () => {
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState();

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
      console.log(result.data.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getFighters();
  }, []);
  
  return <div className="container">awodkaodkasodkawodkoadni</div>;
};

export default PickFight;
