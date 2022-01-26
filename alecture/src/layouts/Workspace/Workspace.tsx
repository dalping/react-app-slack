import axios from "axios";
import React, { useCallback, useState, VFC } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fecther from "../../utils/fetcher";
import {
  MenuScroll,
  Header,
  LogOutButton,
  WorkspaceButton,
  WorkspaceName,
  ProfileModal,
  WorkspaceWrapper,
  Channels,
  RightMenu,
  ProfileImg,
  AddButton,
  Chats,
  Workspaces,
  WorkspaceModal,
} from "./style";
import gravatar from "gravatar";
import DirectMessage from "../../pages/DirectMessage/DirectMessage";
import Channel from "../../pages/Channel/Channel";
import Menu from "../../components/Menu/Menu";
import { IUser } from "../../typings/db";
import Modal from "../../components/Modal/Modal";
import { Input, Button, Label } from "./style";
import CreateChannelModal from "../../components/CreateChannelModal/CreateChannelModal";

const Workspace: VFC = () => {
  const [newWorkspaceInput, setNewWorkspaceInput] = useState({
    newName: "",
    newUrl: "",
  });
  const [showWorkspaceModal, setshowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  const { newName, newUrl } = newWorkspaceInput;

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

  const onClickAddChannnel = useCallback(() => {
    setShowCreateChannelModal((prev) => !prev);
  }, []);

  const onCreateWorkspace = useCallback(
    (e) => {
      e.preventDefault();

      if (!newName || !newName.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post(
          "http://localhost:3095/api/workspaces",
          {
            workspace: newName,
            url: newUrl,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          revalidate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspaceInput({
            newName: "",
            newUrl: "",
          });
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    [newName, newUrl]
  );

  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(!showCreateWorkspaceModal);
  }, [showCreateWorkspaceModal]);

  const onChange = useCallback(
    (e) => {
      const { value, name } = e.target;
      setNewWorkspaceInput({ ...newWorkspaceInput, [name]: value });
    },
    [newWorkspaceInput]
  );

  //화면에 띄워진 모달 모두 끄기
  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
  }, [showCreateWorkspaceModal]);

  const toggleWorkspaceModal = useCallback(() => {
    setshowWorkspaceModal((prev) => !prev);
  }, []);

  //로그인 되어있지 않은 경우
  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(data.email, { s: "28px", d: "retro" })}
              alt={data.nickname}
            />
            {showUserMenu && (
              <Menu
                style={{ top: 55, right: 10 }}
                show={showUserMenu}
                onCloseModal={onClickUserProfile}
              >
                프로필
                <ProfileModal>
                  <img
                    src={gravatar.url(data.email, { s: "28px", d: "retro" })}
                    alt={data.nickname}
                  />
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>

      <WorkspaceWrapper>
        <Workspaces>
          {data.Workspaces.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${123}/channel/일반`}>
                <WorkspaceButton>
                  {ws.name.slice(0, 1).toUpperCase()}
                </WorkspaceButton>
              </Link>
            );
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>Sleact</WorkspaceName>
          <MenuScroll>
            <Menu
              show={showWorkspaceModal}
              onCloseModal={toggleWorkspaceModal}
              style={{ top: 120, left: 80 }}
            >
              <WorkspaceModal>
                <h2>채널 만들기</h2>
                <button onClick={onClickAddChannnel}>채널만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>워크스페이스 이름</span>
            <Input
              id="workspace_name"
              name="newName"
              value={newWorkspaceInput.newName}
              onChange={onChange}
            />
          </Label>
          <Label id="workspace-label">
            <span>워크스페이스 url</span>
            <Input
              id="workspace_url"
              name="newUrl"
              value={newWorkspaceInput.newUrl}
              onChange={onChange}
            />
          </Label>
          <Button type="submit">생성하기</Button>
        </form>
      </Modal>
      <CreateChannelModal
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        // setShowCreateChannelModal={setShowCreateChannelModal}
      ></CreateChannelModal>
    </div>
  );
};

export default Workspace;
