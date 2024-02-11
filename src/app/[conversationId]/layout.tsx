import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import getConversationById from "../actions/getConversationById";
import getCurrentUser from "../actions/getCurrentUser";
import getUsersWithConversation from "../actions/getUserWithConversations";
import getMessages from "../actions/getMessages";
import { Conversation, User } from "@prisma/client";
import Forum from "./components/Forum";
import getChannelsWithConversation from "../actions/getChannelsWithConversation";
import ForumContainer from "./components/ForumContainer";

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

  console.log(params);

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

          <ForumContainer
            conversationId={params.conversationId}
            conversation={conversation}
            currentUser={currentUser}
            messages={messages}
            children={children}
          />
        </div>
      </main>
    </>
  );
}
