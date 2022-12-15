import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        sign out
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Leaderboard
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Profile
      </button>
    </div>
  );
};

export default Header;
