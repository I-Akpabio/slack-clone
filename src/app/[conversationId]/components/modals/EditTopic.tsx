import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalContainer from "./ModalContainer";
import { useState } from "react";

const EditTopicModal = ({
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
      title="Edit Topic"
    >
      <div className="px-6 pb-6" autoFocus>
        <form action="">
          <br />
          <div className="border-grey-200 " style={{ borderWidth: "1px" }}>
            <textarea
              style={{ borderWidth: 0 }}
              autoFocus={true}
              value={name}
              rows={4}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add a Topic"
              className="px-4 py-2 w-full focus:outline-none"
            />
          </div>
        </form>

        <p className="light-1 mt-1">
          Let people know what #budget is focused on right now (ex. a project
          milestone). Topics are always visible in the header.
        </p>

        <div className="flex flex-row-reverse mt-12">
          <button className="border px-4 py-2 bg-lime-600 text-white ml-3 rounded">
            Save
          </button>
          <button
            className="border px-3 py-2 rounded"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default EditTopicModal;
