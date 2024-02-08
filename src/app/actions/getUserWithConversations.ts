import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getUsersWithConversation = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const usersWithConversation = users.map(async (user: any) => {
      const existingConversations = await prisma.conversation.findMany({
        where: {
          isGroup: false,
          OR: [
            {
              userIds: {
                equals: [currentUser.id, user.id],
              },
            },
            {
              userIds: {
                equals: [user.id, currentUser.id],
              },
            },
          ],
        },
        include: {
          messages: true,
        },
      });

      if (existingConversations.length > 0) {
        return { ...user, conversation: existingConversations[0] };
      } else {
        return user;
      }
    });

    return usersWithConversation;
  } catch (e: any) {
    console.log(e);
    return ["error"];
  }
};

export default getUsersWithConversation;
