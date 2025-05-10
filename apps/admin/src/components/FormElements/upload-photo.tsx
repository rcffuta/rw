"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteProfileImage, uploadProfileImage } from "@/actions/storage.action";
import { UploadIcon } from "@/components/Icons";
import toast from "react-hot-toast";


export default function PhotoUploader({imageUrl, onUpload}:{imageUrl:string|null; onUpload:(url:string | null)=>void}) {
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const result: any = await uploadProfileImage(formData);
      onUpload(result.secure_url);
      setPublicId(result.public_id);
      toast.success("Uploaded Image");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!publicId) return;
    const toastId = "deleteToast";

    toast.loading("Deleting image", {id: toastId});

    try {
      await deleteProfileImage(publicId);
      onUpload(null);
      setPublicId(null);
      toast.success("Deleted Image", { id: toastId });
    } catch (err) {
      toast.error("Delete failed", { id: toastId });
      console.error("Failed to delete image:", err);
    }
  };

  return (
    <>
      <>
        {imageUrl && (
          <div className="mb-4 flex items-center gap-3">
            <Image
              src={imageUrl}
              width={55}
              height={55}
              alt="Uploaded User"
              className="size-14 rounded-full object-cover"
              quality={90}
            />
            <div>
              {/* <span className="mb-1.5 font-medium text-dark dark:text-white">
                Edit your photo
              </span> */}
              <span className="flex gap-3">
                <button
                  type="button"
                  className="text-body-sm hover:text-red"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </span>
            </div>
          </div>
        )}

        {imageUrl ? null : <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            hidden
            onChange={handleChange}
            // disabled={isUploading}
          />

          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              {isUploading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                <UploadIcon />
              )}
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and
              drop
            </p>

            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>}

        {/* <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
            disabled={!imageUrl}
          >
            Save
          </button>
        </div> */}
      </>
    </>
  );
}
