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
    <img width={36} height={36} className="self-baseline mr-2" src={image || "profile.png"} alt="" />
    <div className="grow">
      <div className="flex items-center">
        <h5 className="font-bold text-sm">{name || "Joe Addams"}</h5>
        <p className="ml-3 light-2">6:59pm</p>
      </div>

      <p style={{fontSize:'15px'}}>
        {message ||
          "   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur odit incidunt nihil quo, quidem obcaecati porro voluptatem tenetur praesentium sit!"}
      </p>
    </div>
  </div>
);

export default ChatMessage;