import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    // const currentUser =  await getCurrentUser();
    const body = await request.json();

    const { userId, isDirect, members, name } = body;

    if (!isDirect) {
      const conversation = await prisma.conversation.create({
        data: {
          name,
        },
      });

      return NextResponse.json(conversation)
    }

    
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
