import React, { useState, useEffect, FC } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import Axios from "axios";

type LoginObj = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [dataRequest, setDataRequest] = useState<LoginObj>({
    username: "",
    password: "",
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await Axios({
        url: "http://localhost:9000/auth/login",
        method: "POST",
        data: dataRequest,
      });
      if (result.status === 200) {
        alert("Logged in!");
        console.log(result.data.token);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("Enter");
    }
  };

  useEffect(() => {
    if (dataRequest.password !== "" && dataRequest.username !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataRequest.username, dataRequest.password]);

  return (
    <div className="wrapper">
      <div className="login">
        <div>
          <h2>
            Welcome to <span>BROFIST</span>
          </h2>
          <p>A place where you can beat the sh*t out of anyone</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <button disabled={disabled} type="submit">
            Login
          </button>
          <div>
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register here!
            </Link>
          </div>
        </form>
      </div>
      <div className="wallpaper"></div>
    </div>
  );
};

export default Login;
