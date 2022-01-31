import io from "socket.io-client";
import React, { useCallback } from "react";

const sockets = {};
const backUrl = `http://localhost:3095`;
const useSocket = (workspace?: string) => {
  if (!workspace) return;
  sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`);
  //   const socket = io.connect(`${backUrl}`);
  //보내기
  sockets[workspace].emit("hello", "world");
  //받기
  sockets[workspace].on("message", (data: any) => {
    console.log(data);
  });
};

export default useSocket;
