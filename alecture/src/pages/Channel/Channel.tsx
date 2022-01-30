import React, { useState, useCallback } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import { ChatList } from "../../components/ChatList/ChatList";
import Workspace from "../../layouts/Workspace/Workspace";
import { Container, Header } from "./style";

function Channel() {
  const [chat, setChat] = useState("");
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    setChat("");
  }, []);

  const onChangeChat = useCallback((e) => {
    setChat(e.target.value);
  }, []);

  return (
    <Container>
      <Header>채널</Header>
      <ChatList />
      <ChatBox
        chat={chat}
        onChangeChat={onChangeChat}
        onSubmitForm={onSubmitForm}
      />
    </Container>
  );
}

export default Channel;
