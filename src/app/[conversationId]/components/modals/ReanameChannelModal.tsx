import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalContainer from "./ModalContainer";
import { useState } from "react";

const RenameChannelModal = ({
  showModal,
  closeModal,
  channelName
}: {
  showModal: boolean;
  closeModal: Function;
  channelName: string
}) => {
  const [name, setName] = useState(channelName);
  const submit = () => {
    alert("submitting " + name)
  }
  return (
    <ModalContainer
      showModal={showModal}
      closeModal={closeModal}
      title="Rename Channel"
    >
      <div className="px-6 pb-6 pt-3">
        <form action="">
          <label className="text-sm font-semibold text-gray-600" htmlFor="">
            Channel Name
          </label>{" "}
          <br />
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
              role="textbox"
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g testing-channel"
              className="px-4 py-2 w-full focus:outline-none"
            />
          </div>
        </form>

        <p className="light-1 mt-1">
          Names must be lowercase, without spaces or periods, and can’t be
          longer than 80 characters.
        </p>

        <div className="flex flex-row-reverse mt-12">
          <button onClick={submit} className="border px-3 py-2 bg-gray-300 text-gray ml-3 rounded">
            Save Changes
          </button>
          <button className="border px-3 py-2 rounded" onClick={()=>closeModal()}>Cancel</button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default RenameChannelModal;
