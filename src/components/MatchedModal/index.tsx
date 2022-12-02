import React, { FC } from "react";
import { ReactComponent as SuccessIcon } from "../../assets/icons/Success.svg";

interface Props {
  message: string;
  open: boolean;
  onClose: () => void;
}

const MatchedModal: FC<Props> = ({ message, open, onClose }) => {
  return (
    <>
      {open ? (
        <div className="matched-modal" onClick={onClose}>
          <div className="matched-container">
            <SuccessIcon className="succes-icon" />
            <h1>{message}</h1>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MatchedModal;
