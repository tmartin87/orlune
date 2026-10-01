import type { LandingBlock } from "../types/landing-block";

type BlockRendererProps = {
  block: LandingBlock;
  isEditing?: boolean;
};

function getSafeButtonUrl(value: string | undefined): string | null {
  if (!value?.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

export function BlockRenderer({
  block,
  isEditing = false,
}: BlockRendererProps) {
  const buttonUrl =
  block.type === "hero"
    ? getSafeButtonUrl(block.content.buttonUrl)
    : null;
  switch (block.type) {
    case "hero":
      return (
        <section className="rounded-lg bg-slate-50 px-6 py-16 text-center">
          <h1 className="mx-auto max-w-2xl break-words text-4xl font-bold tracking-tight text-slate-900">
            {block.content.heading}
          </h1>

          <p className="mx-auto mt-5 max-w-xl break-words text-lg leading-relaxed text-slate-600">
            {block.content.subheading}
          </p>

          {!isEditing && buttonUrl ? (
  <a
    href={buttonUrl}
    className="mt-8 inline-block max-w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white break-words hover:bg-indigo-700"
  >
    {block.content.buttonText}
  </a>
) : (
  <button
    type="button"
    disabled
    className="mt-8 max-w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white break-words"
  >
    {block.content.buttonText}
  </button>
)}
          {block.content.imageUrl?.trim() && (
            <img
              src={block.content.imageUrl.trim()}
              alt={block.content.imageAlt ?? ""}
              className="mx-auto mt-10 aspect-video w-full max-w-3xl rounded-xl object-cover"
            />
          )}
        </section>
      );

    case "cta":
      return (
        <section className="rounded-lg bg-slate-900 px-6 py-12 text-center">
          <h2 className="mx-auto max-w-xl break-words text-2xl font-semibold text-white">
            {block.content.heading}
          </h2>

          <button
            type="button"
            className="mt-6 max-w-full rounded-lg bg-white px-6 py-3 font-medium text-slate-900 break-words hover:bg-slate-100"
          >
            {block.content.buttonText}
          </button>
        </section>
      );
  }
}
