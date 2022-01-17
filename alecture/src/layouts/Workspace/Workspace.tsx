import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { Navigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fecther from "../../utils/fetcher";
import * as Styled from "./style";

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate, mutate } = useSWR(
    "http://localhost:3095/api/users",
    fecther,
    {
      dedupingInterval: 100000,
    }
  );

  const onLogout = useCallback(() => {
    axios
      .post("http://localhost:3095/api/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {
        //revalidate();
        mutate(false);
      });
  }, []);

  //로딩 처리
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  //로그인 되어있지 않은 경우
  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Styled.Header>
        <Styled.RightMenu>
          <span>
            <Styled.ProfileImg src="" alt={data.nickname} />
          </span>
        </Styled.RightMenu>
      </Styled.Header>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
