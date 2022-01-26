import React, { FC, useCallback } from "react";
import { CSSProperties } from "styled-components";
import { CloseModalButton, CreateMenu } from "./style";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({
  children,
  style,
  show,
  onCloseModal,
  closeButton,
}) => {
  //이벤트 버블링 방지
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {closeButton && (
          <CloseModalButton onClick={onCloseModal}></CloseModalButton>
        )}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
