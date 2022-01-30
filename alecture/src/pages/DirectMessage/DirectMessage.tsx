import React, { useState, useCallback } from "react";
import Workspace from "../../layouts/Workspace/Workspace";
import { Container, Header } from "./style";
import gravatar from "gravatar";
import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import { IUser } from "../../typings/db";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
import { ChatList } from "../../components/ChatList/ChatList";

function DirectMessage() {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData } = useSWR(
    `/api/workspaces/${workspace}/users/${id}`,
    fetcher
  );
  const { data: myData } = useSWR("/api/users", fetcher);
  const [chat, setChat] = useState("");

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log("submit");
    setChat("");
  }, []);

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

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
