const ChatMessage = ({
  name,
  message,
  image,
}: {
  name?: any;
  message?: any;
  image?: any;
}) => (
  <div className="flex mt-3">
  {message.sender.image? <img
      width={36}
      height={36}
      className="self-baseline mr-2"
      src={image ? "/"+image : "/profile.png"}
      alt=""
    />:
    <div className="p-3 mr-3" style={{background: 'rgba(17,100,163,0.7)', color: 'white'}}>I</div>}
    
    <div className="grow">
      <div className="flex items-center">
        <h5 className="font-bold text-sm">{message.sender.name}</h5>
        <p className="ml-3 light-2">6:59pm</p>
      </div>

      <p style={{ fontSize: "15px" }}>
        {message.body}
      </p>
    </div>
  </div>
);

export default ChatMessage;
