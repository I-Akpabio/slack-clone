import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        },
      },
      include: {
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: [
            {
              id: newMessage.id,
            },
          ],
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    // updatedConversation.users.map((user: any) => {
    //   pusherServer.trigger(user.email, "conversation:update", {
    //     id: conversationId,
    //     messages: [lastMessage],
    //   });
    // });

    const other = updatedConversation.users.filter(
      (user: any) => user.email != currentUser.email
    );

    console.log(other)

    if (updatedConversation.isGroup) {
      other.map((user: any) => {
        pusherServer.trigger(user.email, "conversation:update", {
          isGroup: true,
          conversationId: conversationId,
        });
      });
    } else {
      const otherEmail = other.length > 0 ? other[0].email : currentUser.email;

      pusherServer.trigger(otherEmail, "conversation:update", {
        isGroup: false,
        sender: currentUser.email,
      });
    }

    return NextResponse.json(updatedConversation);
  } catch (error: any) {
    console.log(error, "ERROR_MESSAGE");

    return new NextResponse("Error", { status: 400 });
  }
}
