import React, { useCallback, useState, VFC } from "react";
import { CreateModal, CloseModalButton, Label, Button, Input } from "./style";

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const CreateChannelModal: VFC<Props> = ({ show, onCloseModal }) => {
  const [newChannel, setNewChannel] = useState("");

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onCreateChannel = useCallback(() => {}, []);

  const onChangeNewChannel = useCallback(() => {}, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="workspace-label">
          <span>채널 만들기</span>
          <Input
            id="channel"
            name="channel"
            value={newChannel}
            onChange={onChangeNewChannel}
          />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </CreateModal>
  );
};

export default CreateChannelModal;
