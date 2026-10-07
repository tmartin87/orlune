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
  switch (block.type) {
    case "hero": {
      const layout = block.content.layout ?? "centered";
      const imageUrl = block.content.imageUrl?.trim();
      const buttonUrl = getSafeButtonUrl(block.content.buttonUrl);

      const isBackground = layout === "background";
      const isSplit = layout === "split" && Boolean(imageUrl);

      const alignment =
        block.content.alignment ?? (isSplit ? "left" : "center");

      const isLeftAligned = alignment === "left";
      const isDark = isBackground || block.content.theme === "dark";

      const buttonClassName = [
        "mt-8 inline-block max-w-full rounded-lg px-6 py-3",
        "break-words font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        isDark
          ? "bg-white text-slate-900 hover:bg-slate-100"
          : "bg-indigo-600 text-white hover:bg-indigo-700",
      ].join(" ");

      return (
        <section
          className={[
            "relative isolate overflow-hidden rounded-lg px-6 py-16 sm:px-10",
            isDark ? "bg-slate-900" : "bg-slate-50",
          ].join(" ")}
        >
          {isBackground && imageUrl && (
            <>
              <img
                src={imageUrl}
                alt=""
                className="absolute inset-0 -z-20 h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-slate-950/65"
              />
            </>
          )}

          <div
            className={[
              "relative mx-auto max-w-6xl",
              isSplit ? "grid items-center gap-10 md:grid-cols-2" : "",
              isBackground ? "flex min-h-96 items-center" : "",
            ].join(" ")}
          >
            <div
              className={[
                "min-w-0 w-full",
                isSplit ? "" : "max-w-3xl",
                isLeftAligned ? "text-left" : "mx-auto text-center",
              ].join(" ")}
            >
              <h1
                className={[
                  "break-words text-4xl font-bold tracking-tight sm:text-5xl",
                  isDark ? "text-white" : "text-slate-900",
                ].join(" ")}
              >
                {block.content.heading}
              </h1>

              <p
                className={[
                  "mt-5 max-w-xl break-words text-lg leading-relaxed",
                  isLeftAligned ? "" : "mx-auto",
                  isDark ? "text-slate-200" : "text-slate-600",
                ].join(" ")}
              >
                {block.content.subheading}
              </p>

              {!isEditing && buttonUrl ? (
                <a href={buttonUrl} className={buttonClassName}>
                  {block.content.buttonText}
                </a>
              ) : (
                <button type="button" disabled className={buttonClassName}>
                  {block.content.buttonText}
                </button>
              )}
            </div>

            {!isBackground && imageUrl && (
              <img
                src={imageUrl}
                alt={block.content.imageAlt ?? ""}
                className={[
                  "w-full rounded-xl object-cover",
                  isSplit
                    ? "aspect-square min-w-0"
                    : "mt-10 aspect-video max-w-3xl",
                  !isSplit && !isLeftAligned ? "mx-auto" : "",
                ].join(" ")}
              />
            )}
          </div>
        </section>
      );
    }
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
