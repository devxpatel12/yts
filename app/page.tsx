import React from "react";
import ShortsCard from "@/components/ytshorts/shorts";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const Shorts = async () => {
  const user = await currentUser();

  if (!user) return null;

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: `${user.firstName}`,
        email: user.emailAddresses[0].emailAddress,
        clerkUserId: user.id,
      },
    });
  }
  const shorts = await prisma.short.findMany({
    where: { userId: loggedInUser?.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Shorts Cards Container */}
      <div className="flex flex-col items-center">
        {shorts.map((short, index) => (
          <div
            key={index}
            className="snap-start flex justify-center items-center h-screen"
          >
            <ShortsCard short={short} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shorts;
