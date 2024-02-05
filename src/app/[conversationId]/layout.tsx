import { InfoIcon, NewUser, PhoneIcon, StarIcon } from "../components/Icon";
import Sidebar from "./components/Sidebar";
import getUsers from "@/app/actions/getUsers";
import getChannels from "../actions/getChannels";
import ChatMessage from "../components/ChatMessage";
import Time from "../components/Time";
import Nav from "./components/Nav";
import getConversationById from "../actions/getConversationById";
import MessageBox from "./components/MessageBox";
import getCurrentUser from "../actions/getCurrentUser";
import getMessages from "../actions/getMessages";
import { Conversation, User } from "@prisma/client";
import Avatar from "./components/Avatar";

export default async function ConversationsLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const users = await getUsers();
  const channels = await getChannels();
  const conversation: Conversation = await getConversationById(
    params.conversationId
  );

  const currentUser = await getCurrentUser();

  const messages = await getMessages(params.conversationId);

  const otherUser = () => {
    let other = "";

    conversation.users.forEach((element: User) => {
      if (element.id != currentUser.id) other = element.name;
    });

    return other;
  };

  const other = otherUser();

  return (
    <>
      {" "}
      <main className="">
        <Nav currentUser={currentUser} />
        <div className="grid grid-cols-10">
          <div className="col-span-2 side-menu">
            <Sidebar
              users={users}
              channels={channels}
              currentUser={currentUser}
              conversationId={params.conversationId}
              conversation={conversation}
            />
          </div>

          <div className={`col-span-5 col-span-8 p-5 center-container`}>
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
                    <span className="mx-3 font-bold">
                      # {conversation?.name}
                    </span>
                    <StarIcon />
                  </div>

                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {conversation.users.map((user: any) => (
                        <Avatar text={user.name[0]} size="small" />
                      ))}
                    </div>

                    <span className="mr-3">{conversation.users.length}</span>

                    <NewUser />
                  </div>
                </div>
                <hr className="my-4" />
              </>
            )}

            <div className="main-section">
              <Time />

              {messages.map((message: any) => (
                <ChatMessage message={message} />
              ))}

              <MessageBox conversationId={params.conversationId} />

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
          </div>
        </div>
      </main>
    </>
  );
}
