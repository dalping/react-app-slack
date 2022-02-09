import io from "socket.io-client";
import React, { useCallback } from "react";

//ts에서 빈배열이나 빈객체에는 타이핑을 해줘야 한다!!!!!!
const sockets: { [key: string]: SocketIOClient.Socket } = {};
const backUrl = `http://localhost:3095`;

const useSocket = (
  workspace: string
): [SocketIOClient.Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    sockets[workspace].disconnect;
    delete sockets[workspace];
  }, [workspace]);

  if (!workspace) return [undefined, disconnect];
  sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`);
  //   const socket = io.connect(`${backUrl}`);
  //보내기
  //   sockets[workspace].emit("hello", "world");
  //   //받기
  //   sockets[workspace].on("message", (data: any) => {
  //     console.log(data);
  //   });
  //   sockets[workspace].on("data", (data: any) => {
  //     console.log(data);
  //   });
  //   sockets[workspace].on("onlineList", (data: any) => {
  //     console.log(data);
  //   });

  return [sockets[workspace], disconnect];
};

export default useSocket;
