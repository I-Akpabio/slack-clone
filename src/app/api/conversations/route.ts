import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { userId, isDirect, members, name } = body;

    if (!isDirect) {
      const conversation = await prisma.conversation.create({
        data: {
          isGroup: true,
          name,
        },
      });

      return NextResponse.json(conversation);
    }

    if (userId == currentUser.id) {
      const existingSingleConversations = await prisma.conversation.findMany({
        where: {
          isGroup: false,
          userIds: {
            equals: [currentUser.id],
          },
        },
        include: {
          users: true,
        },
      });

      const singleConversation = existingSingleConversations[0];

      if (singleConversation) {
        return NextResponse.json(singleConversation);
      } else {
        const newConversation = await prisma.conversation.create({
          data: {
            isGroup: false,
            users: {
              connect: [
                {
                  id: currentUser.id,
                },
              ],
            },
          },
          include: {
            users: true,
          },
        });
        return NextResponse.json(newConversation);
      }
    }

    const existingConversations = await prisma.conversation.findMany({
      where: {
        isGroup: false,
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
      include: {
        users: true,
      },
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        isGroup: false,
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    // Update all connections with new conversation
    // newConversation.users.map((user) => {
    //   if (user.email) {
    //     pusherServer.trigger(user.email, 'conversation:new', newConversation);
    //   }
    // });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
