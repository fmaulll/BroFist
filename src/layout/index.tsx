import React, { FC, useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import "./styles.scss";
import Warning from "../assets/icons/Warning.svg";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  const user = sessionStorage.getItem("username");
  const [loginRegisterPage, setLoginRegisterPage] = useState<boolean>(false);

  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/register"
    ) {
      setLoginRegisterPage(true);
    }
  }, [window.location.pathname]);

  const WarningIcon = () => {
    return <img src={Warning} alt="Warning Icon" />;
  };

  return (
    <div>
      {user || loginRegisterPage ? (
        <div>{children}</div>
      ) : (
        <div className="not-authorized">
          <WarningIcon />
          <h1>Error 401</h1>
          <h2>Not Authorized</h2>
        </div>
      )}
    </div>
  );
};

export default Container;
