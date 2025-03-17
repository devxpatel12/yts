"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import type { Prisma, Short } from "@prisma/client";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;

type ShortPageProps = {
  short: Prisma.ShortGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          email: true;
        };
      };
    };
  }>;
};

const ShortsCard: React.FC<ShortPageProps> = ({ short }) => {
  return (
    <Card className="p-0 w-[360px] h-[640px] flex flex-col items-center justify-center rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative">
      {/* Video Player */}
      <ImageKitProvider urlEndpoint={urlEndpoint}>
        <IKVideo
          path={short.url.replace(urlEndpoint, "")} // Extract the relative path
          transformation={[{ height: "640", width: "360", format: "mp4" }]} // Match card dimensions
          className="absolute inset-0 w-full h-full object-cover" // Make video cover the entire card
          controls
          autoPlay={false}
        />
      </ImageKitProvider>

      {/* Channel Info */}
      <CardFooter className="absolute bottom-20 -left-2 text-white">
        <div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h3 className="font-semibold ">{short.title}</h3>
              <span className="text-xs">{short.user.name}</span>
            </div>
          </div>
          <div className="text-sm mt-2">
            <p>
              Hello everyone! this is white background video, you can
              download without any copyright issues.
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShortsCard;
