import React, { FC } from "react";
import "./styles.scss";
import Peter from "../../assets/maxresdefault.jpeg";

interface Props {
  data: {
    fname: string;
    lname: string;
    height: number;
    weight: number;
    wins: number;
    username: string;
    imageUrl: string;
  };
}

const FighterCard: FC<Props> = ({ data }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={data.imageUrl ? data.imageUrl : Peter} />
      </div>
      <div className="content">
        <h2>
          {data.fname} {data.fname.length + data.lname.length > 18 ? data.lname.slice(0, 5) + "..." : data.lname}
        </h2>
        <div className="summary">
          <div className="summary-info wins">
          {data.wins} Wins
          </div>
          <div className="summary-info height">
          {data.height} Cm
          </div>
          <div className="summary-info weight">
          {data.weight} Kg
          </div>
        </div>
      </div>
    </div>
  );
};

export default FighterCard;
