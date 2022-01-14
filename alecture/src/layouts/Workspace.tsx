import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import useSWR from "swr";
import fecther from "../utils/fetcher";

function Workspace({ children }) {
  const { data, error } = useSWR("http://localhost:3095/api/users", fecther, {
    dedupingInterval: 100000,
  });
  const onLogout = useCallback(() => {
    axios
      .post("http://localhost:3095/api/users/logout", null, {
        withCredentials: true,
      })
      .then(() => {});
  }, []);
  return (
    <div>
      <button>로그아웃</button>
      {children}
    </div>
  );
}

export default Workspace;
