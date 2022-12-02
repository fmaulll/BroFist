import React, { useState, useEffect, FC } from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useAppDispatch } from "../../hooks";
import { userActions } from "../../store/slice/userSlice";
import InputText from "../../components/InputText";

type LoginObj = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [dataRequest, setDataRequest] = useState<LoginObj>({
    username: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
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
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("id", result.data.id);
        sessionStorage.setItem("username", result.data.username);
        dispatch(userActions.login());
        navigate("/fight");
      }
    } catch (err) {
      alert(err);
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
          <InputText
            value={dataRequest.username}
            label="Username"
            placeholder="Username"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("username", e.target.value)
            }
          />
          <InputText
            value={dataRequest.password}
            label="Password"
            placeholder="Password"
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange("password", e.target.value)
            }
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
