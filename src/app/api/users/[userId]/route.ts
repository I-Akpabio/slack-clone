import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  userId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
  try {
    const { userId } = params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Some error Occured");
  }
}
