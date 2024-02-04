"use client";
import React, { useState } from "react";
import axios from "axios";

function MessageBox(props: any) {
  const [msg, setMsg] = useState("");
  const sendMessage = () => {
    const payload = {
      message: msg,
      image: "",
      conversationId: props.conversationId,
    };

    axios
      .post("/api/messages", payload)
      .then((res) => console.log(res))
      .finally(() => setMsg(""));
  };

  return (
    <div className="flex">
      <input
        onChange={(e) => setMsg(e.target.value)}
        className="mt-5 grow focus:outline-none"
        type="text"
        placeholder="Type Message here"
        value={msg}
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
}

export default MessageBox;
