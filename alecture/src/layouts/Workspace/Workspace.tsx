import axios from "axios";
import React, { useCallback, useState, FC } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fecther from "../../utils/fetcher";
import * as Styled from "./style";
import gravatar from "gravatar";
import DirectMessage from "../../pages/DirectMessage/DirectMessage";
import Channel from "../../pages/Channel/Channel";
import Menu from "../../components/Menu/Menu";
import { IUser } from "../../typings/db";

const Workspace: FC = ({ children }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data, error, revalidate, mutate } = useSWR<IUser | false>(
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

  // //로딩 처리 //에러남 나중에 수정하기
  // if (data === undefined) {
  //   return <div>로딩중...</div>;
  // }

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu(!showUserMenu);
  }, [showUserMenu]);

  const onClickCreateWorkspace = useCallback(() => {}, []);

  //로그인 되어있지 않은 경우
  if (!data) {
    return <Redirect to="/login" />;
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
            {showUserMenu && (
              <Menu
                style={{ right: 0 }}
                show={showUserMenu}
                onCloseModal={onClickUserProfile}
              >
                프로필
                <Styled.ProfileModal>
                  <img
                    src={gravatar.url(data.email, { s: "28px", d: "retro" })}
                    alt={data.nickname}
                  />
                </Styled.ProfileModal>
                <Styled.LogOutButton onClick={onLogout}>
                  로그아웃
                </Styled.LogOutButton>
              </Menu>
            )}
          </span>
        </Styled.RightMenu>
      </Styled.Header>
      <button onClick={onLogout}>로그아웃</button>
      <Styled.WorkspaceWrapper>
        <Styled.Workspaces>
          {data?.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <Styled.WorkspaceButton>
                  {ws.name.slice(0, 1).toUpperCase()}
                </Styled.WorkspaceButton>
              </Link>
            );
          })}
          <Styled.AddButton onClick={onClickCreateWorkspace}>
            +
          </Styled.AddButton>
        </Styled.Workspaces>
        <Styled.Channels>
          <Styled.WorkspaceName>Sleact</Styled.WorkspaceName>
          <Styled.MenuScroll>menu scroll</Styled.MenuScroll>
        </Styled.Channels>
        <Styled.Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Styled.Chats>
      </Styled.WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
