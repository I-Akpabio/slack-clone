import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "@headlessui/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LockIcon, StarIcon } from "@/app/components/Icon";
import Avatar from "./Avatar";

interface ModalProps {
  showModal: boolean;
  setShowModal: Function;
  currentUser: any;
  setShowSubModal: Function;
}

export default function UserListModal({
  setShowModal,
  showModal,
  currentUser,
  setShowSubModal,
}: ModalProps) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const route = useRouter();

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setName("");
    }, 400);

    axios.get("/api/users").then((res) => setUsers(res.data));
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white pt-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-xl font-bold leading-6 text-gray-900 pl-6 mb-5"
                  >
                    # budget
                  </Dialog.Title>
                  <div className="mt-2 flex mb-4 px-6 mb-2">
                    <button className="border px-2 py-1 mr-2">
                      <StarIcon />
                    </button>
                    <button className="border px-2 py-1">
                      Get all notifications for messages
                    </button>
                  </div>

                  <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                  >
                    <Tab.List>
                      <Tab className={"focus:outline-none"}>
                        <p
                          className={`ml-6 pb-2 text-sm font-medium ${
                            selectedIndex == 0 && "border-b-2 border-lime-600"
                          }`}
                        >
                          About
                        </p>
                      </Tab>
                      <Tab className={"focus:outline-none"}>
                        <p
                          className={`ml-6 pb-2 text-sm font-medium ${
                            selectedIndex == 1 && "border-b-2 border-lime-700"
                          }`}
                        >
                          Members {users.length}
                        </p>
                      </Tab>
                      <Tab>
                        <p
                          className={`ml-6 pb-2 text-sm font-medium ${
                            selectedIndex == 2 && "border-b-2 border-lime-700"
                          }`}
                        >
                          Settings
                        </p>
                      </Tab>
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        <div
                          style={{ height: "24rem" }}
                          className="bg-gray-50 p-6 rounded"
                        >
                          <div className="bg-white border mb-2 px-3 rounded-lg">
                            <div className="flex justify-between ">
                              <p className="font-bold text-sm">Channel name</p>
                              <button
                                className="text-sm"
                                style={{ color: "blue" }}
                                onClick={() => setShowSubModal("EDIT_CHANNEL")}
                              >
                                Edit
                              </button>
                            </div>
                            # budget
                          </div>
                          <div className="bg-white border">
                            <div className="border-b mt-2 mb-2 px-5 py-2">
                              <div className="flex justify-between ">
                                <p className="font-bold text-sm">Topic</p>
                                <button
                                  className="text-sm"
                                  style={{ color: "blue" }}
                                  onClick={() =>
                                    setShowSubModal("EDIT_TOPIC")
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-gray-800">Add a topic</p>
                            </div>

                            <div className="mt-2 mb-2 px-3 py-2">
                              <div className="flex justify-between ">
                                <p className="font-bold text-sm">Description</p>
                                <button
                                  className="text-sm"
                                  style={{ color: "blue" }}
                                  onClick={() =>
                                    setShowSubModal("EDIT_CHANNEL")
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                              <p className="text-gray-600">
                                This is the channel description for #budget.
                                This is where the budget planning for the
                                organization occurs
                              </p>
                            </div>

                            <hr />
                            <div className="mt-2 px-3 py-2">
                              <p className="font-bold text-sm">Created By</p>
                              Inyeneobong Akpabio
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div className="p-6" style={{ height: "24rem" }}>
                          <div
                            className="border-grey-200 flex items-center mb-5"
                            style={{ borderWidth: "1px" }}
                          >
                            <FontAwesomeIcon
                              icon={faSearch}
                              className="pl-4"
                              style={{ color: "grey" }}
                            />
                            <input
                              style={{ borderWidth: 0 }}
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Find members"
                              className="px-3 py-2 w-full focus:outline-none"
                            />
                          </div>

                          {users.map((user: any) => (
                            <div className="flex justify-between mb-3">
                              <div className="flex justify-between">
                                <Avatar
                                  text={user.name[0]}
                                  size="large"
                                  showActive={false}
                                />

                                <p>
                                  {user.name}{" "}
                                  {currentUser?.id == user.id && "(you)"}
                                </p>
                              </div>

                              {currentUser?.id != user.id ? (
                                <button className="text-sky-500 text-sm">
                                  remove
                                </button>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel>
                        <div
                          className="p-6 bg-gray-50"
                          style={{ height: "24rem" }}
                        >
                          <div className="bg-white border mb-2 p-3 rounded">
                            <div className="flex justify-between ">
                              <p className="font-bold text-sm">Channel name</p>
                              <button
                                className="text-sm"
                                style={{ color: "blue" }}
                                onClick={() => setShowSubModal("EDIT_CHANNEL")}
                              >
                                Edit
                              </button>
                            </div>
                            # budget
                          </div>

                          <div className="bg-white border">
                            <div className="border-b mt-2 mb-3 px-3 pb-4 pt-4 flex">
                              <LockIcon />
                              <p className="ml-4">Switch to Private Channel</p>
                            </div>

                            <div className="text-red mt-2 mb-3 px-3 pb-4 pt-4 flex items-center">
                              <FontAwesomeIcon icon={faTrash} />
                              <p className="ml-4 text-red">
                                Delete this Channel
                              </p>
                            </div>
                          </div>
                        </div>{" "}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
