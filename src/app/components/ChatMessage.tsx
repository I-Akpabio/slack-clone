import Avatar from "../[conversationId]/components/Avatar";
import { format } from "date-fns";

const fS = {fontSize: '11px'}

const ChatMessage = ({
  name,
  message,
  image,
}: {
  name?: any;
  message?: any;
  image?: any;
}) => (
  <div className="flex mt-3 mb-2">
    {message.sender.image ? (
      <img
        width={36}
        height={36}
        className="self-baseline mr-2"
        src={image ? "/" + image : "/profile.png"}
        alt=""
      />
    ) : (
      <Avatar text={message.sender.name[0]} />
    )}

    <div className="grow">
      <div className="flex items-center">
        <h5 className="font-bold text-sm">{message.sender.name}</h5>
        <p style={fS} className="ml-3 light-2">{format(message.createdAt, "hh: mm aaa")}</p>
      </div>

      <p style={{ fontSize: "15px" }}>{message.body}</p>
    </div>
  </div>
);

export default ChatMessage;
