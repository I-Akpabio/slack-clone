"use server"
import prisma from "@/app/libs/prismadb";

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (e: any) {
    console.log(e)
    return ['error'];
  }
};

export default getUsers;
