"use client";
import React, { useEffect } from "react";
import Avatar from "../../components/Avatar";
import { CiMail, CiPhone, CiClock1 } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";

const blue = { color: "blue" };

function Profile() {
  const params = useParams();

  useEffect(() => {
    axios.get("/api/users/" + params.profileId).then((res) => {
      console.log(res);
    });
  }, []);
  
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between border-b px-3 mb-3">
        <p className="font-bold text-lg">Profile</p>
        <button onClick={() => router.back()}>
          <IoMdClose />
        </button>
      </div>
      <div className="flex justify-center">
        <Avatar text="I" size="xl" />
      </div>

      <div className="flex justify-between px-3">
        <p className="text-xl font-semibold mt-3">Inyeneobong Akpabio</p>

        <button className="text-sm font-semibold" style={{ color: "blue" }}>
          Edit
        </button>
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

          <button className="text-sm font-semibold" style={{ color: "blue" }}>
            Edit
          </button>
        </div>

        <div className="flex mt-3">
          <div className="bg-gray-100 p-2 mt-2">
            <CiMail size={20} className="" />
          </div>

          <div className="ml-3">
            <p className="text-sm">Email</p>
            <p className="" style={blue}>
              thelordvoldermort97@gmail.com
            </p>
          </div>
        </div>

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
      </div>
    </div>
  );
}

export default Profile;
