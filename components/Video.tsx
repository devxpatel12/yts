"use client";
import React from "react";
import { IKVideo } from "imagekitio-next";

const urlEndPoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

type VideoProps = {
  path: string;
  width?: string;
  height?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
};

const Video: React.FC<VideoProps> = (props) => {
  return <IKVideo urlEndpoint={urlEndPoint} {...props} />;
};
export default Video;
