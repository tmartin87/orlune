
import { useState, type ChangeEvent } from "react";
import { uploadHeroImage } from "../image-upload-api";


type HeroImageUploadProps = {
  projectId: string;
  onUploaded: (url: string) => void;
};

export function HeroImageUpload({
  projectId,
  onUploaded,
}: HeroImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0];

    event.currentTarget.value = "";

    if (!file) {
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const imageUrl = await uploadHeroImage(projectId, file);
      onUploaded(imageUrl);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not upload image.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block space-y-2 text-sm font-medium text-slate-700">
        Upload image
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isUploading}
          onChange={handleFileChange}
          className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
        />
      </label>

      <p className="text-xs text-slate-500">
        JPG, PNG or WebP. Maximum 5 MB.
      </p>

      {isUploading && (
        <p role="status" className="text-sm text-indigo-600">
          Uploading image...
        </p>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}