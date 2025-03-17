"use client";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT as string;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

const authenticator = async () => {
  try {
    const response = await fetch("/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    return {
      signature: String(data.signature),
      expire: Number(data.expire),
      token: String(data.token),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
    throw error;
  }
};

type UploadProps = {
  setVideoUrl: (url: string) => void;
}

const Upload = ({ setVideoUrl }: UploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onError = (err:any) => { 
    setError(err.message);
    console.log("Error got -> ", err);
    
    setUploadProgress(null); // Hide progress bar on error
  };

  const onSuccess = (res : IKUploadResponse) => { 
    console.log("uploaded response -> ",res);
    setVideoUrl(res.url);
    
    setUploadProgress(100);
    setError(null); // Clear error if the upload succeeds
  };

  const onUploadProgress = (evt: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (evt.lengthComputable) {
      const progress = Math.round((evt.loaded / evt.total) * 100);
      setUploadProgress(progress);
    }
  };

  const onUploadStart = () => { 
    setUploadProgress(0); // Show progress bar on upload start
    setError(null); // Clear any previous error
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="mb-6">
        <label
          htmlFor="file"
          className="block text-sm font-medium"
        >
          Upload Short Video
        </label>
        <IKUpload
          useUniqueFileName
          validateFile={(file) => file.size < 20 * 1024 * 1024}
          folder="/reel-folder"
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart} 
          className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Show progress bar only when upload is in progress */}
        {uploadProgress !== null && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Show error message if upload fails */}
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </div>
    </ImageKitProvider>
  );
};

export default Upload;
