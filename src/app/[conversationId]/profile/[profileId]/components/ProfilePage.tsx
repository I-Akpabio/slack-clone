"use client";
import React, { useEffect, useState } from "react";
import Avatar from "@/app/[conversationId]/components/Avatar";
import { CiMail, CiPhone, CiClock1 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EditContactModal from "./EditContactModal";
import toast from "react-hot-toast";

const blue = { color: "rgb(2 132 199)" };

interface SProps {
  name: string;
  email: string;
  phone: string;
}

function Profile({ currentUser, test }: { currentUser: any; test: any }) {
  const params = useParams();
  const [user, setUser] = useState<SProps>({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showEdit = currentUser.email == user?.email;

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/users/" + params.profileId)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const submit = (phone: any) => {
    axios.post("/api/users/" + params.profileId, { phone }).then((res) => {
      if (res.status == 200) {
        setUser(res.data);
        toast.success("Saved");
      }
    });
  };

  const router = useRouter();
  return (
    <div>
      <EditContactModal
        submit={submit}
        email={user?.email}
        phoneNumber={user?.phone}
        setShowModal={setShowModal}
        showModal={showModal}
        loading={loading}
      />
      <div className="flex justify-between border-b px-3 pb-4 mb-3">
        <p className="font-bold text-lg">Profile</p>
        <button onClick={() => router.replace("/"+params.conversationId)}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex justify-center">
        {user.name ? (
          <Avatar text={user.name[0]} size="xl" />
        ) : (
          <div className="w-24 bg-gray-300 h-24"></div>
        )}
      </div>

      <div className="flex justify-between px-3">
        <p className="text-xl font-semibold mt-3">{user?.name}</p>

        {showEdit && (
          <button className="text-sm font-semibold" style={blue}>
            Edit
          </button>
        )}
      </div>

      <div className="px-3 text-gray-700 text-md">
        <p className="my-1">Active</p>

        <div className="flex items-center my-3">
          <CiClock1 size={20} />
          <p className="ml-2">{format(new Date(), "hh:mm a")} local time</p>
        </div>
      </div>

      <hr />

      <div className="px-3 my-4">
        <div className="flex justify-between ">
          <p className="text-grey-500 font-semibold">Contact Information</p>

          {showEdit && (
            <button
              className="text-sm font-semibold"
              onClick={() => setShowModal(true)}
              style={{ color: "blue" }}
            >
              Edit
            </button>
          )}
        </div>

        <div className="flex mt-3">
          <div className="bg-gray-100 p-2 mt-2">
            <CiMail size={20} className="" />
          </div>

          <div className="ml-3">
            <p className="text-sm">Email</p>
            <p className="" style={blue}>
              {user?.email}
            </p>
          </div>
        </div>

        {showEdit && (
          <>
            {user.phone ? (
              <div className="flex mt-3">
                <div className="bg-gray-100 p-2 mt-2">
                  <CiPhone size={20} className="" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">Phone Number</p>
                  <p className="" style={blue}>
                    09061931589
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3" style={blue}>
                <FontAwesomeIcon className="mr-2" icon={faPlus} /> Add Phone
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
