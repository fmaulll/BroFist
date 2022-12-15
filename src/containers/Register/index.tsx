import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../components/InputText";
import "./styles.scss";
import { ReactComponent as RightArrow } from "../../assets/icons/RightArrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/icons/LeftArrow.svg";
import axios from "axios";
import { ReactComponent as ImageIcon } from "../../assets/icons/Image.svg";

type dataRequestValue = {
  username: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  height: number;
  weight: number;
  image: any;
  province: string;
  city: string;
};

type disabledButton = {
  tabOne: boolean;
  tabTwo: boolean;
  tabThree: boolean;
  tabFour: boolean;
};

type dataProvinceValue = {
  province: string;
  capitalCity: string;
};

type dataCityValue = {
  name: string;
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
    image: "",
    province: "",
    city: "",
  });
  const [disabled, setDisabled] = useState<disabledButton>({
    tabOne: false,
    tabTwo: false,
    tabThree: false,
    tabFour: false,
  });
  const [disabledCity, setDisabledCity] = useState<boolean>(true);
  const [valueTab, setValueTab] = useState<number>(0);
  const [dataProvinces, setDataProvinces] = useState<dataProvinceValue[]>([]);
  const [dataCity, setDataCity] = useState<dataCityValue[]>([]);

  const handleChange = (key: string, value: any) => {
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const getProvinces = async () => {
    try {
      const result = await axios({
        url: `${import.meta.env.VITE_BROFIST_URL}/geolocation/province`,
        method: "GET",
      });
      if (result.status === 200) {
        setDataProvinces(result.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getCity = async () => {
    try {
      const result = await axios({
        url: `${import.meta.env.VITE_BROFIST_URL}/geolocation/city`,
        method: "POST",
        data: { province: dataRequest.province },
      });
      if (result.status === 200) {
        setDataCity(result.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setDisabledCity(true);
    if (dataRequest.province !== "") {
      setDisabledCity(false);
      getCity();
    }
  }, [dataRequest.province, dataRequest.city]);

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    setDisabled((prev) => {
      return {
        ...prev,
        tabOne: true,
        tabTwo: true,
        tabThree: true,
      };
    });
    if (
      dataRequest.username !== "" &&
      dataRequest.email !== "" &&
      dataRequest.password !== ""
    ) {
      setDisabled((prev) => {
        return {
          ...prev,
          tabOne: false,
        };
      });
    }

    if (dataRequest.fname !== "" && dataRequest.lname !== "") {
      setDisabled((prev) => {
        return {
          ...prev,
          tabTwo: false,
        };
      });
    }

    if (dataRequest.height > 100 && dataRequest.weight > 10) {
      setDisabled((prev) => {
        return {
          ...prev,
          tabThree: false,
        };
      });
    }
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
          ) : valueTab === 2 ? (
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
          ) : valueTab === 3 ? (
            <>
              <label htmlFor="province-select">Province</label>
              <select
                id="province-select"
                value={dataRequest.province}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange("province", e.target.value)
                }
              >
                <option value="">Select Province</option>
                {dataProvinces.map((item) => (
                  <option value={item.province}>{item.province}</option>
                ))}
              </select>
              <label htmlFor="city-select">City</label>
              <select
                disabled={disabledCity}
                id="city-select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleChange("city", e.target.value)
                }
              >
                <option value="">Select Province</option>
                {dataCity.map((item) => (
                  <option value={item.name}>{item.name}</option>
                ))}
              </select>
            </>
          ) : (
            <>
              <label htmlFor="input-image" className="input-image-label">
                <ImageIcon className="image-icon" />
                {dataRequest.image === "" ? (
                  <h5>Upload photo</h5>
                ) : (
                  <h5>{dataRequest.image.name}</h5>
                )}
              </label>
              <input
                accept="image/png, image/jpeg"
                id="input-image"
                type="file"
                className="input-image"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  handleChange("image", file);
                  e.target.value = "";
                }}
              />
            </>
          )}
          {valueTab === 4 ? (
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
        ) : valueTab === 1 || valueTab === 2 || valueTab === 3 ? (
          <div className="buttons-register">
            <button className="left" onClick={handleClickBack}>
              <LeftArrow className="register-icon" /> Back
            </button>
            <button
              className="right"
              disabled={valueTab === 1 ? disabled.tabTwo : valueTab === 2 ? disabled.tabThree : disabled.tabFour}
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
