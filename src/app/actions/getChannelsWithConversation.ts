import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getChannelsWithConversation = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
    const channels = await prisma.channel.findMany({});

    const channelsWithConversation = channels.map(async (channel: any) => {
      const existingConversation = await prisma.conversation.findUnique({
        where: {
          id: channel.conversationId,
        },
        include: {
          messages: true,
        },
      });

      if (existingConversation) {
        return { ...channel, conversation: existingConversation };
      } else {
        return channel;
      }
    });

    const numFruits = await Promise.all(channelsWithConversation);

    return numFruits;
  } catch (e: any) {
    console.log(e);
    return ["error"];
  }
};

export default getChannelsWithConversation;
