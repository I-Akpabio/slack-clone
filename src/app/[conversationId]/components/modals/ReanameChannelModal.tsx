import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalContainer from "./ModalContainer";
import { useState } from "react";

const RenameChannelModal = ({
  showModal,
  closeModal,
}: {
  showModal: boolean;
  closeModal: Function;
}) => {
  const [name, setName] = useState("");
  return (
    <ModalContainer
      showModal={showModal}
      closeModal={closeModal}
      title="Rename Channel"
    >
      <div className="p-6">
        <form action="">
          <label htmlFor="">Channel Name</label> <br />
          <div
            className="border-grey-200 mt-3 flex items-center"
            style={{ borderWidth: "1px" }}
          >
            <FontAwesomeIcon
              icon={faHashtag}
              className="pl-4"
              style={{ color: "grey" }}
            />
            <input
              style={{ borderWidth: 0 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g testing-channel"
              className="px-4 py-2 w-full focus:outline-none"
            />
          </div>
        </form>

        <p className="light-1">
          Channels are where conversations happen around a topic. Use a name
          that is easy to find and understand.
        </p>

        <div className="flex flex-row-reverse mt-6">
          <button className="border px-3 py-1 bg-gray-400 text-white ml-3">Save Changes</button>
          <button className="border px-3 py-1">Cancel</button>
        </div>
      </div>
      
    </ModalContainer>
  );
};

export default RenameChannelModal;
