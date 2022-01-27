import axios from "axios";
import React, { useCallback, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import { Label, Button, Input } from "../Modal/style";
import useSWR from "swr";
import { IChannel, IUser } from "../../typings/db";
import fetcher from "../../utils/fetcher";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: VFC<Props> = ({
  show,
  onCloseModal,
  setShowCreateChannelModal,
}) => {
  const [newChannel, setNewChannel] = useState("");
  const { workspace, channel } =
    useParams<{ workspace: string; channel: string }>();
  const { data: userData } = useSWR<IUser | false>("/api/users", fetcher);
  //로그인 한 경우에만 채널 가져오기
  const { data: channelData, revalidate: revalidateChannel } = useSWR<
    IChannel[]
  >(
    userData
      ? `http://localhost:3095/api/workspaces/${workspace}/channels`
      : null,
    fetcher
  );

  const onCreateChannel = useCallback(
    (e) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) return;
      axios
        .post(
          `http://localhost:3095/api/workspaces/${workspace}/channels`,
          {
            name: newChannel,
          },
          { withCredentials: true }
        )
        .then(() => {
          revalidateChannel();
          setShowCreateChannelModal(false);
          setNewChannel("");
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [
      newChannel,
      revalidateChannel,
      setNewChannel,
      setShowCreateChannelModal,
      workspace,
    ]
  );

  const onChangeNewChannel = useCallback((e) => {
    setNewChannel(e.target.value);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="workspace-label">
          <span>채널 만들기</span>
          <Input
            id="workspace_name"
            name="newName"
            value={newChannel}
            onChange={onChangeNewChannel}
          />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
