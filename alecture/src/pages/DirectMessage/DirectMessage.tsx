import React, { useState, useCallback } from "react";
import Workspace from "../../layouts/Workspace/Workspace";
import { Container, Header } from "./style";
import gravatar from "gravatar";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { IDM, IUser } from "../../typings/db";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import { ChatList } from "../../components/ChatList/ChatList";
import axios from "axios";

function DirectMessage() {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(
    `/api/workspaces/${workspace}/users/${id}`,
    fetcher
  );
  const { data: myData } = useSWR("/api/users", fetcher);
  const [chat, setChat] = useState("");

  const {
    data: chatData,
    mutate: mutateChat,
    revalidate,
  } = useSWR<IDM[]>(
    `/api/workspace/${workspace}/dms/${id}/chats?perPage=20&page=1`,
    fetcher
  );

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (chat?.trim()) {
        axios
          .post(
            `http://localhost:3095/api/workspaces/${workspace}/dms/${id}/chats`,
            {
              content: chat,
            }
          )
          .then(() => {
            //채팅을 보낸 후에 채팅 받아오기
            revalidate();
            setChat("");
          })
          .catch((err) => {
            console.log("실패");
            console.dir(err);
          });
      }
    },
    [chat]
  );

  const onChangeChat = useCallback(
    (e) => {
      setChat(e.target.value);
    },
    [chat]
  );

  if (!userData || !myData) return null;

  return (
    <Container>
      <Header>
        <img
          src={gravatar.url(userData.email, { s: "24px", d: "retro" })}
          alt={userData.nickname}
        />
      </Header>
      <ChatList />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
}

export default DirectMessage;
