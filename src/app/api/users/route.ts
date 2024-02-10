

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json( users );
  } catch (error) {
    console.log(error);
    return new NextResponse("Some error Occured");
  }
}
