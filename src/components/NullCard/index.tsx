import React from "react";
import "./styles.scss";
import {ReactComponent as SadIcon} from "../../assets/icons/Sad.svg"

const NullCard = () => {
  return <div className="null-card">
    <SadIcon className="sad-icon" />
    <h1>No Fighters Available</h1>
  </div>;
};

export default NullCard;
