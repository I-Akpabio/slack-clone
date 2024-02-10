import { useState } from "react";
import RenameChannelModal from "./ReanameChannelModal";

const ModalRoot = ({
  setShowModal,
  subModal,
}: {
  setShowModal: any;
  subModal: any;
}) => {
  

  let Modal = null;

  switch (subModal) {
    case "EDIT_CHANNEL":
      Modal = (
        <RenameChannelModal
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
