import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../components/InputText";
import "./styles.scss";
import { ReactComponent as RightArrow } from "../../assets/icons/RightArrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/icons/LeftArrow.svg";
import axios from "axios";

type dataRequestValue = {
  username: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  height: number;
  weight: number;
};

type disabledButton = {
  tabOne: boolean;
  tabTwo: boolean;
  tabThree: boolean;
};

const Register: FC = () => {
  const navigate = useNavigate();
  const [dataRequest, setDataRequest] = useState<dataRequestValue>({
    username: "",
    email: "",
    password: "",
    fname: "",
    lname: "",
    height: 0,
    weight: 0,
  });
  const [disabled, setDisabled] = useState<disabledButton>({
    tabOne: false,
    tabTwo: false,
    tabThree: false,
  });
  const [valueTab, setValueTab] = useState<number>(0);

  const handleChange = (key: string, value: string | number) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleClickNext = () => {
    setValueTab((prev) => prev + 1);
  };

  const handleClickBack = () => {
    setValueTab((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled((prev) => {
      return {
        ...prev,
        tabThree: true,
      };
    });
    try {
      const result = await axios({
        url: `${import.meta.env.VITE_BROFIST_URL}/auth/register`,
        method: "POST",
        data: dataRequest,
      });
      const { data, status } = result;
      if (status === 201) {
        alert("Created");
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (
      dataRequest.username === "" ||
      dataRequest.email === "" ||
      dataRequest.password === ""
    ) {
      setDisabled((prev) => {
        return {
          ...prev,
          tabOne: true,
        };
      });
    } else {
      setDisabled((prev) => {
        return {
          ...prev,
          tabOne: false,
        };
      });
    }

    if (dataRequest.fname === "" || dataRequest.lname === "") {
      setDisabled((prev) => {
        return {
          ...prev,
          tabTwo: true,
        };
      });
    } else {
      setDisabled((prev) => {
        return {
          ...prev,
          tabTwo: false,
        };
      });
    }

    if (dataRequest.height === 0 || dataRequest.weight === 0) {
      setDisabled((prev) => {
        return {
          ...prev,
          tabThree: true,
        };
      });
    } else {
      setDisabled((prev) => {
        return {
          ...prev,
          tabThree: false,
        };
      });
    }

    console.log(dataRequest);
    console.log(disabled);
  }, [dataRequest]);
  return (
    <div className="wrapper">
      <div className="register">
        <div>
          <h2>
            Register your <span>BROFIST</span> Account
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          {valueTab === 0 ? (
            <>
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
                value={dataRequest.email}
                label="Email"
                placeholder="Email"
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("email", e.target.value)
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
            </>
          ) : valueTab === 1 ? (
            <>
              <InputText
                value={dataRequest.fname}
                label="First Name"
                placeholder="First Name"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("fname", e.target.value)
                }
              />
              <InputText
                value={dataRequest.lname}
                label="Last Name"
                placeholder="Last Name"
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("lname", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <InputText
                value={dataRequest.height}
                label="Height(Cm)"
                placeholder="Height / Cm"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("height", parseInt(e.target.value))
                }
              />
              <InputText
                value={dataRequest.weight}
                label="Weight(Kg)"
                placeholder="Weight / Kg"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange("weight", parseInt(e.target.value))
                }
              />
            </>
          )}
          {valueTab === 2 ? (
            <div className="buttons-register">
              <button className="left" onClick={handleClickBack}>
                <LeftArrow className="register-icon" /> Back
              </button>
              <button
                className="right"
                disabled={disabled.tabThree}
                type="submit"
              >
                Register
              </button>
            </div>
          ) : null}
        </form>
        {valueTab === 0 ? (
          <button disabled={disabled.tabOne} onClick={handleClickNext}>
            Next <RightArrow className="register-icon" />
          </button>
        ) : valueTab === 1 ? (
          <div className="buttons-register">
            <button className="left" onClick={handleClickBack}>
              <LeftArrow className="register-icon" /> Back
            </button>
            <button
              className="right"
              disabled={disabled.tabTwo}
              onClick={handleClickNext}
            >
              Next <RightArrow className="register-icon" />
            </button>
          </div>
        ) : null}
        <div className="bottom-text">
          Already have an account?{" "}
          <Link className="link" to="/">
            Login here!
          </Link>
        </div>
      </div>
      <div className="wallpaper"></div>
    </div>
  );
};

export default Register;
