"use client";
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function MessageBox(props: any) {
  const [msg, setMsg] = useState("");

  const onChange = (e:any) => {
    if(e.keyCode == 13) {
      sendMessage()
    }
  }

  const sendMessage = () => {
    setMsg("")
    const payload = {
      message: msg,
      image: "",
      conversationId: props.conversationId,
    };

    // props.addNewMessage(msg)

    axios
      .post("/api/messages", payload)
      .then((res) => console.log(res))
      .finally(() => setMsg(""));
  };

  return (
    <div className="flex items-end">
      <input
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={onChange}
        className="mt-5 grow focus:outline-none message-input"
        type="text"
        placeholder="Type Message here"
        value={msg}
      />
      <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /> </button>
    </div>
  );
}

export default MessageBox;
