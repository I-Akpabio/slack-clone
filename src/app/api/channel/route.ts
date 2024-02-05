import { connect } from "http2";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const { name } = body;

    if (!name) {
      return new NextResponse("Missing Credentials");
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const conversation = await prisma.conversation.create({
      data: {
        name,
        isGroup: true,
        users: {
          connect: users.map((user: { id: string }) => ({ id: user.id })),
        },
      },
    });

    const channel = await prisma.channel.create({
      data: {
        name,
        conversationId: conversation.id,
      },
    });

    return NextResponse.json(channel);
  } catch (error) {
    console.log(body);
    return new NextResponse("Some error Occured");
  }
}
