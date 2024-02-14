import { Dialog, Transition } from "@headlessui/react";
import { Fragment, MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  showModal: boolean;
  setShowModal: Function;
  email: string;
  loading: boolean;
  submit: Function;
  phoneNumber: string;
}

export default function EditContactModal({
  setShowModal,
  showModal,
  email,
  submit,
  loading,
  phoneNumber
}: ModalProps) {
  const [phone, setPhone] = useState(phoneNumber);
  const route = useRouter();

  const closeModal = () => {
    setShowModal(false);
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white pt-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-xl font-bold leading-6 text-gray-900 pl-6 mb-5"
                  >
                    Edit Contact Information
                  </Dialog.Title>
                  <hr />
                  <div className="px-6 pt-6 pb-8">
                    <label className="mb-3" htmlFor="">
                      Email Address
                    </label>
                    <div
                      className="border-grey-200 flex items-center mt-2 mb-5"
                      style={{ borderWidth: "1px" }}
                    >
                      <input
                        style={{ borderWidth: 0 }}
                        value={email}
                        placeholder="Find members"
                        className="px-3 py-2 w-full text-black bg-gray-100 text-lg focus:outline-none"
                        disabled
                      />
                    </div>

                    <label className="mt-3" htmlFor="">
                      Phone
                    </label>
                    <div
                      className="border-grey-200 flex items-center mt-2 mb-5"
                      style={{ borderWidth: "1px" }}
                    >
                      <input
                        style={{ borderWidth: 0 }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone"
                        className="px-3 py-2 w-full focus:outline-none"
                      />
                    </div>

                    <div className="flex flex-row-reverse mt-6">
                      <button
                        onClick={() => submit(phone)}
                        className="border px-4 py-1 bg-lime-600 text-white ml-3 rounded"
                        disabled={loading}
                      >
                        Save Changes
                      </button>
                      <button
                        className="border px-3 py-2 rounded"
                        onClick={() => closeModal()}
                      >
                        Cancel
                      </button>
                    </div>
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
