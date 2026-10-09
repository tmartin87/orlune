import { useRef, useState, type ChangeEvent } from "react";

import { uploadHeroImage } from "../image-upload-api";

type HeroImageUploadProps = {
  projectId: string;
  imageUrl?: string;
  imageAlt?: string;
  onUploaded: (url: string) => void;
};

export function HeroImageUpload({
  projectId,
  imageUrl,
  imageAlt,
  onUploaded,
}: HeroImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentImageUrl = imageUrl?.trim();

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
      const uploadedUrl = await uploadHeroImage(projectId, file);
      onUploaded(uploadedUrl);
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

  const handleRemove = () => {
    setError(null);
    onUploaded("");
  };

  return (
    <div className="space-y-3" aria-busy={isUploading}>
      {currentImageUrl ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <img
            src={currentImageUrl}
            alt={imageAlt ?? ""}
            className="aspect-video w-full object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 text-center">
          <p className="text-sm font-medium text-slate-600">
            No image selected
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload an image to bring this section to life.
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        disabled={isUploading}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Choose an image"
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
          className="flex-1 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isUploading
            ? "Uploading..."
            : currentImageUrl
              ? "Replace image"
              : "Upload image"}
        </button>

        {currentImageUrl && (
          <button
            type="button"
            disabled={isUploading}
            onClick={handleRemove}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        JPG, PNG or WebP. Maximum 5 MB.
      </p>

      {isUploading && (
        <p role="status" className="text-sm text-indigo-600">
          Uploading image…
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