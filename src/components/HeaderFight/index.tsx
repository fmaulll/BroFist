import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import { ReactComponent as OpponentIcon } from "../../assets/icons/Opponent.svg";
import { ReactComponent as HistoryIcon } from "../../assets/icons/History.svg";
import { ReactComponent as ChatIcon } from "../../assets/icons/Chat.svg";

const paths = [
  {
    label: "Opponent",
    path: "/opponent",
    icon: <OpponentIcon />,
  },
  {
    label: "History",
    path: "/history",
    icon: <HistoryIcon />,
  },
  {
    label: "Matches",
    path: "/matches",
    icon: <ChatIcon />,
  },
];

const HeaderFight = () => {
  const navigate = useNavigate();
  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <div className="header-fight">
      {paths.map((item) => (
        <div
          onClick={() => handleNav(item.path)}
          className="header-fight-button"
        >
          {item.icon} {item.label}
        </div>
      ))}
    </div>
  );
};

export default HeaderFight;
