"use client";
import { uploadShort } from "@/actions/upload-short";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/Upload";
import { Loader2 } from "lucide-react";
import React, { useActionState, useState } from "react";

const UploadShorts = () => {
  const [formState, formAction, isPending] = useActionState(uploadShort, {
    errors: {},
  });
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleSubmit = (formData: FormData) => {
    formData.append("video", videoUrl);
    return formAction(formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Shorts</h2>
      <form action={handleSubmit}>
        {/* Title Field */}
        <div className="mb-4">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </Label>
          <Input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter title"
          />
          {formState.errors.title && (
            <span className="text-red-500 text-sm">
              {formState.errors.title}
            </span>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter description"
          />
          {formState.errors.description && (
            <span className="text-red-500 text-sm">
              {formState.errors.description}
            </span>
          )}
        </div>

        <Upload setVideoUrl={setVideoUrl} />
        {formState.errors.video && (
          <span className="text-red-500 text-sm">{formState.errors.video}</span>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {isPending ? <Loader2 className="animate-spin w-4 h-4" /> : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default UploadShorts;
