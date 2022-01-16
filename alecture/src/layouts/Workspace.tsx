import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { Navigate } from "react-router-dom";
import useSWR from "swr";
import fecther from "../utils/fetcher";

const Workspace: FC = ({ children }) => {
  const { data, error, revalidate } = useSWR(
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
        revalidate();
      });
  }, []);

  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <button>로그아웃</button>
      {children}
    </div>
  );
};

export default Workspace;
