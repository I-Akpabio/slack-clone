import Sidebar from "./components/Sidebar";
import getUsers from "@/app/actions/getUsers";
import getChannels from "../actions/getChannels";
import Nav from "./components/Nav";
import getConversationById from "../actions/getConversationById";
import getCurrentUser from "../actions/getCurrentUser";
import getMessages from "../actions/getMessages";
import { Conversation, User } from "@prisma/client";
import Forum from "./components/Forum";

export default async function ConversationsLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const users:any = []
  //await getUsers();
  const channels:any = await getChannels();
  const conversation: Conversation = await getConversationById(
    params.conversationId
  );

  const currentUser = await getCurrentUser();

  const messages:any = []
  //await getMessages(params.conversationId);

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
            <Forum
              conversationId={params.conversationId}
              conversation={conversation}
              currentUser={currentUser}
              messages={messages}
            />
          </div>
        </div>
      </main>
    </>
  );
}
