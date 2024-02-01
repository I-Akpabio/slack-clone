import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ModalProps {
  showModal: boolean;
  setShowModal: Function;
}

export default function MyModal({ setShowModal, showModal }: ModalProps) {
  const [name, setName] = useState("");
  const route = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setName("");
    }, 400);
  }, [showModal]);

  const submit = () => {
    axios.post("/api/channel", { name }).then((res) => {
      if (res.status == 200) {
        toast.success("Saved");
        setShowModal(false);
        route.refresh();
      }
    });
  };

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-xl font-bold leading-6 text-gray-900 mb-5"
                  >
                    Create a Channel
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 bg-blue-100 p-4 mb-5">
                      <span className="font-bold">
                        {" "}
                        Channels are a way to organize your conversations.{" "}
                      </span>{" "}
                      Below are some suggestions to get you started.
                    </p>
                  </div>

                  <form action="">
                    <label htmlFor="">Name</label> <br />
                    <div
                      className="border-grey-200 my-4 flex items-center"
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
                        className="px-4 py-2 w-full focus:border-0"
                      />
                    </div>
                  </form>

                  <p className="light-1">
                    Channels are where conversations happen around a topic. Use
                    a name that is easy to find and understand.
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={submit}
                    >
                      Next
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
