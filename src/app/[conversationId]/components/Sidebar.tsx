"use client";
import { EditIcon, BottomArrow, HashIcon } from "@/app/components/Icon";
import MyModal from "@/app/components/Modal";
import { faAngleDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { Collapse } from "react-collapse";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { User, Channel } from "@prisma/client";
import Avatar from "./Avatar";

export default function Sidebar({
  channels,
  users,
  conversationId,
  currentUser,
  conversation,
}: {
  users: User[];
  channels: Channel[];
  conversationId?: string;
  currentUser?: any;
  conversation?: any;
}) {

  const [openChannels, setOpenChannels] = useState(true);
  const [openDirect, setOpenDirect] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  const startConversation = (user: User) => {
    axios
      .post("/api/conversations", {
        userId: user.id,
        isDirect: true,
        members: [],
      })
      .then((res: any) => {
        console.log(res);
        router.push("/" + res.data.id);
        if (res.status == 200) {
          setUser(res);
        }
      });
  };

  const isOther = (id: string) => {
    if (conversation?.isGroup) return false;
    if (
      !conversation?.isGroup &&
      conversation?.users?.length == 1 &&
      id == currentUser?.id
    )
      return true;

    let res = false;

    if(!conversation) return false
    conversation.users.forEach((element: User) => {
      if (element.id == id) res = true;
    });

    if (id == currentUser.id) res = false;

    return res;
  };

  return (
    <div className="flex mt-1">
      {/* <div
    style={{
      borderRight: "1px solid rgba(255,255,255,0.3)",
      height: "95vh",
      paddingRight: "10px",
    }}
  >
    <p className="profile-card">A</p>
    <p className="profile-card">B</p>
    <p className="profile-card">C</p>
  </div> */}

      <div className="grow pl-4">
        <MyModal setShowModal={setShowModal} showModal={showModal} />
        <div className="flex items-center justify-between pr-4">
          <button style={{ opacity: 1 }} className="">
            <span style={{ opacity: 1 }} className="mr-3 main-user">
              {currentUser?.name?.split(" ")[0]}
            </span>
            <FontAwesomeIcon
              style={{ width: "12px", height: "12px" }}
              icon={faAngleDown}
            />{" "}
          </button>

          <Link href={"/feyfud/thread/fdsadf"}>
            <EditIcon />
          </Link>
        </div>

        <hr className="my-4 opacity-30" />

        <div>
          <div className="flex items-center mb-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303295 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7V8.05C14 8.69978 13.7419 9.32295 13.2824 9.78241C12.8229 10.2419 12.1998 10.5 11.55 10.5C10.9002 10.5 10.2771 10.2419 9.81759 9.78241C9.70753 9.67235 9.60903 9.5529 9.52286 9.42595C9.50704 9.44239 9.49104 9.45871 9.47487 9.47487C8.8185 10.1313 7.92826 10.5 7 10.5C6.07174 10.5 5.18151 10.1313 4.52513 9.47487C3.86875 8.8185 3.5 7.92826 3.5 7C3.5 6.07174 3.86875 5.18151 4.52513 4.52513C5.18151 3.86875 6.07174 3.5 7 3.5C7.92826 3.5 8.8185 3.86875 9.47487 4.52513C10.1313 5.18151 10.5 6.07174 10.5 7V8.05C10.5 8.32848 10.6106 8.59555 10.8075 8.79246C11.0045 8.98938 11.2715 9.1 11.55 9.1C11.8285 9.1 12.0955 8.98938 12.2925 8.79246C12.4894 8.59555 12.6 8.32848 12.6 8.05V7C12.6 5.89243 12.2716 4.80972 11.6562 3.88881C11.0409 2.96789 10.1663 2.25013 9.14303 1.82628C8.11976 1.40243 6.99379 1.29153 5.9075 1.50761C4.8212 1.72368 3.82338 2.25703 3.0402 3.0402C2.25703 3.82338 1.72368 4.8212 1.50761 5.9075C1.29153 6.99379 1.40243 8.11976 1.82628 9.14303C2.25013 10.1663 2.96789 11.0409 3.88881 11.6562C4.80972 12.2716 5.89243 12.6 7 12.6H7.00069C7.98366 12.601 8.94907 12.3426 9.79909 11.8501C10.1336 11.6563 10.5619 11.7704 10.7557 12.1049C10.9495 12.4394 10.8354 12.8677 10.5009 13.0615C9.43671 13.678 8.22861 14.0012 6.99931 14L7 13.3V14C6.99977 14 6.99954 14 6.99931 14C5.61508 13.9999 4.26196 13.5893 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303295 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506ZM9.1 7C9.1 6.44305 8.87875 5.9089 8.48493 5.51508C8.0911 5.12125 7.55696 4.9 7 4.9C6.44305 4.9 5.9089 5.12125 5.51508 5.51508C5.12125 5.9089 4.9 6.44305 4.9 7C4.9 7.55696 5.12125 8.0911 5.51508 8.48493C5.9089 8.87875 6.44305 9.1 7 9.1C7.55696 9.1 8.0911 8.87875 8.48493 8.48493C8.87875 8.0911 9.1 7.55696 9.1 7Z"
                fill="white"
              />
            </svg>

            <span className="ml-2">Mentions & Reactions</span>
          </div>

          <div className="flex items-center mb-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.7"
                d="M1 2.5C1 1.67157 1.67157 1 2.5 1H7.5C8.32843 1 9 1.67157 9 2.5V13L5 9.57143L1 13V2.5Z"
                stroke="white"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="ml-2">Saved items</span>
          </div>

          <hr className="my-4 opacity-30" />
          <button
            className="mt-3"
            onClick={() => setOpenChannels(!openChannels)}
          >
            <div className="flex items-center">
              {" "}
              <BottomArrow />
              <span className="ml-3">Channels</span>
            </div>
          </button>

          <Collapse isOpened={openChannels}>
            {channels.map((channel: Channel) => (
              <Link
                className={`flex items-center mt-2 ${
                  conversationId == channel.conversationId
                    ? " active-sideitem"
                    : ""
                }`}
                href={"/" + channel.conversationId}
              >
                <HashIcon active={conversationId == channel.conversationId} />
                <span
                  className={`ml-2`}
                  style={{
                    opacity:
                      conversationId == channel.conversationId ? "1" : "0.7",
                  }}
                >
                  {channel.name}
                </span>
              </Link>
            ))}

            <button className="mt-2" onClick={() => setShowModal(true)}>
              <div className="flex items-center">
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>

                <span className="ml-3 opacity-70">Create Channel</span>
              </div>
            </button>
          </Collapse>

          <button className="mt-4" onClick={() => setOpenDirect(!openDirect)}>
            <div className={`flex items-center`}>
              {" "}
              <BottomArrow />
              <span className="ml-4">Direct Messages</span>
            </div>
          </button>

          <Collapse isOpened={openDirect}>
            {users.map((user: { id: string; name: string; image: string }) => (
              <button
                className={`w-full ${
                  isOther(user.id) ? "active-sideitem mt-2" : ""
                }`}
                onClick={() => startConversation(user)}
              >
                <div
                  className={`flex items-center ${
                    isOther(user.id) ? "" : "mt-2"
                  }`}
                >
                  {user.image ? (
                    <img
                      height={18}
                      width={18}
                      className="self-center"
                      src="profile2.png"
                      alt=""
                    />
                  ) : (
                    <Avatar
                      text={user.name[0]}
                      size="small"
                      showActive={false}
                    />
                  )}

                  <span className="ml-2">{user.name}</span>
                </div>
              </button>
            ))}
            <button className=" mt-2" onClick={() => setShowModal(true)}>
              <div className="flex items-center">
                <span>
                  <FontAwesomeIcon icon={faPlus} />
                </span>

                <span className="ml-3 opacity-70">Add Co-workers</span>
              </div>
            </button>
          </Collapse>
        </div>
      </div>
    </div>
  );
}
