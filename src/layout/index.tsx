import React, { FC, useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import "./styles.scss";
import PickFight from "../containers/PickFight";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Header from "../components/Header";
import HeaderFight from "../components/HeaderFight";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");
  const [loginRegisterPage, setLoginRegisterPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoginRegisterPage(false);
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/register"
    ) {
      setLoginRegisterPage(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [loginRegisterPage]);

  return (
    <div>
      {user && !loginRegisterPage ? (
        <div className="wrapper">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="right-grid">
                <Header />
                <PickFight />
              </div>
              <div className="left-grid">
                <HeaderFight/>
                {children}</div>
            </>
          )}
        </div>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default Container;
