import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import getConversationById from "../actions/getConversationById";
import getCurrentUser from "../actions/getCurrentUser";
import getUsersWithConversation from "../actions/getUserWithConversations";
import getMessages from "../actions/getMessages";
import { Conversation, User } from "@prisma/client";
import Forum from "./components/Forum";
import getChannelsWithConversation from "../actions/getChannelsWithConversation";

export default async function ConversationsLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const channels: any = await getChannelsWithConversation();
  const conversation: Conversation = await getConversationById(
    params.conversationId
  );

  const currentUser = await getCurrentUser();
  const messages: any = await getMessages(params.conversationId);
  const usersWithConversation = await getUsersWithConversation();

  return (
    <>
      {" "}
      <main className="">
        <Nav currentUser={currentUser} />
        <div className="grid grid-cols-10">
          <div className="col-span-2 side-menu">
            <Sidebar
              channels={channels}
              currentUser={currentUser}
              conversationId={params.conversationId}
              conversation={conversation}
              usersWithConversation={usersWithConversation}
            />
          </div>

          <div className={`col-span-5 col-span-8 px-5 pt-5 center-container`}>
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
