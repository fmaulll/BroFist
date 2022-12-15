import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import FighterCard from "../../components/FighterCard";
import "./styles.scss";
import { ReactComponent as Cross } from "../../assets/icons/Cross.svg";
import { ReactComponent as Check } from "../../assets/icons/Check.svg";
import MatchedModal from "../../components/MatchedModal";
import NullCard from "../../components/NullCard";
import { useNavigate } from "react-router-dom";

type dataResult = {
  _id: string;
  fname: string;
  lname: string;
  height: number;
  weight: number;
  wins: number;
  username: string;
  imageUrl: string;
};

const PickFight: FC = () => {
  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("id");
  const navigate = useNavigate()
  const [data, setData] = useState<dataResult[] | null>(null);
  const [increment, setIncrement] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const headerSettings = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };

  const handleClickReject = () => {
    if (data?.length === increment + 1) {
      setIncrement(0);
      return;
    }
    setIncrement((prev) => prev + 1);
  };

  const handleClickAccept = async (personId: string | null) => {
    const dataRequest = {
      personId,
      userId,
    };
    try {
      const result = await axios({
        url: "http://localhost:9000/fight/person-to-fight",
        method: "POST",
        data: dataRequest,
        headers: headerSettings,
      });
      if (result.status === 200) {
        setMessage(result.data.message);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          getFighters();
        }, 3000);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getFighters = async () => {
    const userId = sessionStorage.getItem("id");
    try {
      const result = await axios({
        url: `http://localhost:9000/fight/all-fighters/${userId}`,
        method: "GET",
        headers: headerSettings,
      });
      setData(result.data.data);
    } catch (error) {
      alert(error);
      navigate("/")
    }
  };

  useEffect(() => {
    getFighters();
  }, []);

  return (
    <div className="container">
      {data ? <FighterCard data={data[increment]} /> : <NullCard />}
      <div className="buttons-fight">
        <button onClick={handleClickReject} className="button reject">
          <Cross />
        </button>
        <button
          className="button accept"
          onClick={() => handleClickAccept(data ? data[increment]._id : "")}
        >
          <Check />
        </button>
      </div>
      <MatchedModal
        onClose={() => setSuccess(false)}
        open={success}
        message={message}
      />
    </div>
  );
};

export default PickFight;
