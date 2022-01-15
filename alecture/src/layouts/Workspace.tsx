import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import useSWR from "swr";
import fecther from "../utils/fetcher";

function Workspace() {
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

  return (
    <div>
      <button>헐랭</button>
      <button>로그아웃</button>
    </div>
  );
}

export default Workspace;
