import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const { email, name, password } = body;

    if (!email || !password || !name) {
      return new NextResponse("Missing Credentials");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     name,
    //     hashedPassword,
    //   },
    // });

    return NextResponse.json({hashedPassword});
  } catch (error) {
    console.log(error);
    console.log(body);
    return new NextResponse("Some error Occured");
  }
}
