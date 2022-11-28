import React, { FC } from "react";
import "./styles.scss"

interface Props {
  data: {
    fname: string;
    lname: string;
    height: number;
    weight: number;
    win: number;
    username: string;
  }
}

const FighterCard: FC<Props> = ({data}) => {
  return (
    <div className="card">
      <h2>
        {data.fname} {data.lname}
      </h2>
      <h2>
        {data.username} {data.height}
      </h2>
    </div>
  );
};

export default FighterCard;
