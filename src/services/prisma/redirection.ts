import { PrismaClient, type Redirection } from "@prisma/client";

const prisma = new PrismaClient();

export const getMostRecentRedirection =
  async (): Promise<Redirection | null> => {
    const mostRecentRedirection = await prisma.redirection.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    return mostRecentRedirection;
  };

export const createRedirection = async (link: string): Promise<Redirection> => {
  // Adding https:// to the link if it doesn't start with http:// or https://
  if (!link.startsWith("http://") && !link.startsWith("https://")) {
    link = `https://${link}`;
  }

  const redirection = await prisma.redirection.create({
    data: {
      link,
    },
  });

  return redirection;
};
