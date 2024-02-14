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

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const body = await request.json();
    const { userId } = params;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        phone: body.phone
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Some error Occured");
  }
}
