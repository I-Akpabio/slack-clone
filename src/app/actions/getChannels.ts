import prisma from "@/app/libs/prismadb";

const getChannels = async () => {
  try {
    const users = await prisma.channel.findMany({});

    return users;
  } catch (e: any) {
    console.log(e)
    return ['error'];
  }
};

export default getChannels;
