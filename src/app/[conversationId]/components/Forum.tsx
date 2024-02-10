"use client";
import ChatMessage from "@/app/components/ChatMessage";
import { PhoneIcon, InfoIcon, StarIcon, NewUser } from "@/app/components/Icon";
import Time from "@/app/components/Time";
import React from "react";
import Avatar from "./Avatar";
import MessageBox from "./MessageBox";
import { User } from "@prisma/client";

import ModalRoot from "./modals/ModalRoot";

import { useState, useEffect } from "react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
import axios from "axios";
import UserListModal from "./UserListModal";

const Forum = ({
  currentUser,
  conversation,
  conversationId,
  messages,
}: {
  conversation: any;
  currentUser: any;
  conversationId: string;
  messages: any;
}) => {
  const [messageList, setMessageList] = useState(messages);
  const [showModal, setShowModal] = useState(false);
  const [subModal, setShowSubModal] = useState(null);

  useEffect(() => {
    const lastMessage = messageList[messageList.length - 1];
    if (!lastMessage) return;

    const seen = lastMessage.seenIds.filter((id: any) => id == currentUser.id);

    if (seen.length == 0) {
      axios
        .post(`/api/conversations/${conversationId}/seen`, {})
        .then(() => {});
    }
  }, []);

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: any) => {
      console.log("got message");
      setMessageList((current: any) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
    };
  }, [conversationId]);

  const otherUser = () => {
    if (!conversation) return "";
    let other = "";

    if (conversation.users.length == 1 && !conversation.isGroup) {
      return conversation.users[0].name;
    }

    conversation.users.forEach((element: User) => {
      if (element.id != currentUser.id) other = element.name;
    });

    return other;
  };

  const addNewMessage = (newMessage: string) => {
    const payload = {
      body: newMessage,
      conversationId,
      createdAt: new Date(),
      sender: {
        name: currentUser?.name,
        email: currentUser?.email,
        image: currentUser?.image,
      },
    };

    setMessageList((oldMessage: any) => [...oldMessage, payload]);
  };

  const other = otherUser();

  return (
    <>
      <UserListModal
        currentUser={currentUser}
        setShowModal={setShowModal}
        showModal={true}
        setShowSubModal={setShowSubModal}
      />

      <ModalRoot subModal={subModal} setShowModal={setShowSubModal} />

      {!conversation?.isGroup ? (
        <div
          className="flex justify-between w-100 pb-4"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}
        >
          <div className="flex items-center">
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="4" r="4" fill="#34785C" />
            </svg>
            <span className="mx-3 font-bold">{other} </span>
          </div>

          <div className="flex">
            <span className="mr-4">
              <PhoneIcon />
            </span>

            <InfoIcon />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between w-100 pb-4">
            <div className="flex items-center">
              <span className="mx-3 font-bold"># {conversation?.name}</span>
              <StarIcon />
            </div>

            <div className="flex items-center">
              <button className="flex items-center">
                <Avatar text={currentUser.name[0]} size="small" />

                <span className="mr-3 ml-2">{conversation.users.length}</span>
              </button>

              <NewUser />
            </div>
          </div>
          <hr className="my-4" />
        </>
      )}

      <div className="main-section">
        <div className="messages-container">
          <Time />
          {messageList.map((message: any) => (
            <ChatMessage message={message} />
          ))}
        </div>

        <MessageBox
          addNewMessage={addNewMessage}
          conversationId={conversationId}
        />

        {/* <CKEditor
        editor={ ClassicEditor }
        data="<p>Hello from CKEditor&nbsp;5!</p>"
        onReady={ editor => {
            // You can store the "editor" and use when it is needed.
            console.log( 'Editor is ready to use!', editor );
        } }
        onChange={ ( event ) => {
            console.log( event );
        } }
        onBlur={ ( event, editor ) => {
            console.log( 'Blur.', editor );
        } }
        onFocus={ ( event, editor ) => {
            console.log( 'Focus.', editor );
        } }
    /> */}
      </div>
    </>
  );
};

export default Forum;
