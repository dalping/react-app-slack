import React, { useCallback, FC } from "react";
import { CreateModal, CloseModalButton } from "./style";

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}></CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
