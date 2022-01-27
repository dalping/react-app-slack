import axios from "axios";
import React, { useCallback, useState, VFC } from "react";
import { Redirect, Switch, Route, Link, useParams } from "react-router-dom";
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
import { IChannel, IUser } from "../../typings/db";
import Modal from "../../components/Modal/Modal";
import { Input, Button, Label } from "./style";
import CreateChannelModal from "../../components/CreateChannelModal/CreateChannelModal";
import fetcher from "../../utils/fetcher";
import InviteWorkspaceModal from "../../components/InviteWorkspaceModal/InviteWorkspaceModal";

const Workspace: VFC = () => {
  const [newWorkspaceInput, setNewWorkspaceInput] = useState({
    newName: "",
    newUrl: "",
  });
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] =
    useState(false);
  const [showWorkspaceModal, setshowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] =
    useState(false);

  const { newName, newUrl } = newWorkspaceInput;
  const { workspace, channel } =
    useParams<{ workspace: string; channel: string }>();

  const {
    data: userData,
    error,
    revalidate,
    mutate,
  } = useSWR<IUser | false>("http://localhost:3095/api/users", fecther, {
    dedupingInterval: 2000,
  });

  const { data: channelData } = useSWR<IChannel[]>(
    userData
      ? `http://localhost:3095/api/workspaces/${workspace}/channels`
      : null,
    fetcher
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
    setShowInviteWorkspaceModal(false);
  }, [showCreateWorkspaceModal]);

  const toggleWorkspaceModal = useCallback(() => {
    setshowWorkspaceModal((prev) => !prev);
  }, []);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal((prev) => !prev);
  }, []);
  // //로딩 처리 //에러남 나중에 수정하기
  if (userData === undefined) {
    return <div>로딩중...</div>;
  }

  //로그인 되어있지 않은 경우
  if (!userData) {
    return <Redirect to="/login" />;
  }

  //!나중에 수정 해야 함. 로그인 하자마자 워크스페이스 바로 불러오지 않는 현상
  if (userData.Workspaces === undefined) return <div>로딩중...</div>;

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg
              src={gravatar.url(userData.email, { s: "28px", d: "retro" })}
              alt={userData.nickname}
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
                    src={gravatar.url(userData.email, {
                      s: "28px",
                      d: "retro",
                    })}
                    alt={userData.nickname}
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
          {userData?.Workspaces.map((ws, idx) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/일반`}>
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
                <button onClick={onClickInviteWorkspace}>
                  워크스페이스에 사용자 초대
                </button>
                <button onClick={onClickAddChannnel}>채널만들기</button>
                <button onClick={onLogout}>로그아웃</button>
              </WorkspaceModal>
            </Menu>
            {channelData?.map((v, idx) => (
              <div key={idx}>{v.name}</div>
            ))}
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route
              path="/workspace/:workspace/channel/:channel"
              component={Channel}
            />
            <Route
              path="/workspace/:workspace/dm/:id"
              component={DirectMessage}
            />
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
        setShowCreateChannelModal={setShowCreateChannelModal}
      ></CreateChannelModal>
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      ></InviteWorkspaceModal>
    </div>
  );
};

export default Workspace;
