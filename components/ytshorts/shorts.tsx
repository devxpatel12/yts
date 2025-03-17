"use client";
import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import type { Prisma, Short } from "@prisma/client";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;

type ShortPageProps = {
  short: Prisma.ShortGetPayload<{
    include:{
      user:{
        select:{
          name:true;
          email:true;
        }
      }
    }
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

      {/* Video Title */}
      <CardContent className="absolute bottom-14 left-4">
        <h3 className="text-sm font-semibold line-clamp-2 text-white">
          {short.title}
        </h3>
      </CardContent>

      {/* Channel Info */}
      <CardFooter className="absolute bottom-4 right-4">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-xs text-white">{short.user.name}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShortsCard;
