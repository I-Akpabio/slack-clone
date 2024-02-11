"use client";
import React from "react";
import Forum from "./Forum";
import { useParams, usePathname, useRouter } from "next/navigation";

interface IProps {
  children: any;
  conversation: any;
  currentUser: any;
  conversationId: string;
  messages: any;
}

const ForumContainer = ({
  children,
  currentUser,
  conversation,
  conversationId,
  messages,
}: IProps) => {
  const params = useParams();
  const router = useRouter();
  const hasExtra = Object.keys(params).length > 1;
  return (
    <>
      <div
        className={`${
          hasExtra ? "col-span-5" : "col-span-8"
        } px-5 pt-5 center-container`}
      >
        <Forum
          conversationId={conversationId}
          conversation={conversation}
          currentUser={currentUser}
          messages={messages}
          hasExtra={hasExtra}
        />
      </div>
      {hasExtra && (
        <div className={`col-span-3 pt-5 center-container`}>
          {children}
        </div>
      )}
    </>
  );
};

export default ForumContainer;
