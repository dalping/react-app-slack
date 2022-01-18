import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fecther from "../../utils/fetcher";
import * as Styled from "./style";
import gravatar from "gravatar";
import DirectMessage from "../../pages/DirectMessage/DirectMessage";
import Channel from "../../pages/Channel/Channel";
import Menu from "../../components/Menu/Menu";

const Workspace: FC = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
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

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu(!showUserMenu);
  }, [showUserMenu]);

  //로그인 되어있지 않은 경우
  if (!data) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Styled.Header>
        <Styled.RightMenu>
          <span onClick={onClickUserProfile}>
            <Styled.ProfileImg
              src={gravatar.url(data.email, { s: "28px", d: "retro" })}
              alt={data.nickname}
            />
            {showUserMenu && <Menu>프로필 메뉴</Menu>}
          </span>
        </Styled.RightMenu>
      </Styled.Header>
      <button onClick={onLogout}>로그아웃</button>
      <Styled.WorkspaceWrapper>
        <Styled.Workspaces>test</Styled.Workspaces>
        <Styled.Channels>
          <Styled.WorkspaceName>Sleact</Styled.WorkspaceName>
          <Styled.MenuScroll>menu scroll</Styled.MenuScroll>
        </Styled.Channels>
        <Styled.Chats>
          <Routes>
            <Route path="/workspace/channel" element={<Channel />} />
            <Route path="/workspace/dm" element={<DirectMessage />} />
          </Routes>
        </Styled.Chats>
      </Styled.WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
