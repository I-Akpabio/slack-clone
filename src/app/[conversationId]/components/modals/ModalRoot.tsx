import { useState } from "react";
import RenameChannelModal from "./ReanameChannelModal";
import EditTopicModal from "./EditTopic";
import EditDescription from './EditDescription'

const ModalRoot = ({
  setShowModal,
  subModal,
  conversation
}: {
  setShowModal: any;
  subModal: any;
  conversation: any
}) => {
  

  let Modal = null;

  switch (subModal) {
    case "EDIT_CHANNEL":
      Modal = (
        <RenameChannelModal
          channelName={conversation?.name}
          showModal={true}
          closeModal={() => setShowModal(null)}
        />
      );
      break;

      case "EDIT_TOPIC":
        Modal = (
          <EditTopicModal
            showModal={true}
            closeModal={() => setShowModal(null)}
          />
        );
        break;

        case "EDIT_DESCRIPTION":
        Modal = (
          <EditDescription
            showModal={true}
            closeModal={() => setShowModal(null)}
          />
        );
        break;

    default:
      Modal = null;
  }

  return <>{Modal}</>;
};

export default ModalRoot;
