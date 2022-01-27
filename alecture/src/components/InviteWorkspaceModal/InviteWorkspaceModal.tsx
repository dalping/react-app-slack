import axios from "axios";
import React, { useState, VFC, useCallback } from "react";
import fetcher from "../../utils/fetcher";
import Modal from "../Modal/Modal";
import { Label, Button, Input } from "../Modal/style";
import useSWR from "swr";
import { IUser } from "../../typings/db";
import { useParams } from "react-router-dom";

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void;
}

const InviteWorkspaceModal: VFC<Props> = ({
  show,
  onCloseModal,
  setShowInviteWorkspaceModal,
}) => {
  const [newMember, setNewMember] = useState("");
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const { data: userData } = useSWR<IUser>("/api/users", fetcher);
  const { mutate: revalidateMember } = useSWR<IUser[]>(
    userData ? `/api/workspaces/${workspace}/members` : null,
    fetcher
  );

  const onChangeNewMember = useCallback((e) => {
    setNewMember(e.target.value);
  }, []);

  const onInviteMember = useCallback(
    (e) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) return;

      axios
        .post("http://localhost:3095/api/workspaces/${workspace}/members", {
          email: newMember,
        })
        .then(() => {
          revalidateMember;
          setShowInviteWorkspaceModal(false);
          setNewMember("");
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [
      newMember,
      workspace,
      revalidateMember,
      setShowInviteWorkspaceModal,
      setNewMember,
    ]
  );

  if (!show) {
    return null;
  }

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="workspace-label">
          <span>이메일</span>
          <Input
            id="member-label"
            value={newMember}
            onChange={onChangeNewMember}
          />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
