import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { LandingBlock } from "@orlune/shared";

import { BlockRenderer } from "../blocks/BlockRenderer";

type LandingLivePreviewProps = {
  blocks: LandingBlock[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
};

type PreviewDevice = "desktop" | "mobile";

const deviceSizes = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
};

const previewDocument = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Landing preview</title>
  </head>
  <body style="margin: 0; background: white;"></body>
</html>
`;

export function LandingLivePreview({
  blocks,
  isExpanded,
  onToggleExpanded,
}: LandingLivePreviewProps) {
  const [device, setDevice] = useState<PreviewDevice>("mobile");
  const [previewBody, setPreviewBody] = useState<HTMLElement | null>(null);
  const [availableSize, setAvailableSize] = useState({
    width: 0,
    height: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      setAvailableSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!previewBody) {
      return;
    }

    const previewHead = previewBody.ownerDocument.head;

    const syncStyles = () => {
      previewHead
        .querySelectorAll("[data-preview-style]")
        .forEach((element) => element.remove());

      document.head
        .querySelectorAll('style, link[rel="stylesheet"]')
        .forEach((element) => {
          const copy = element.cloneNode(true) as HTMLElement;

          copy.setAttribute("data-preview-style", "");
          previewHead.appendChild(copy);
        });
    };

    syncStyles();

    const observer = new MutationObserver(syncStyles);

    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();

      previewHead
        .querySelectorAll("[data-preview-style]")
        .forEach((element) => element.remove());
    };
  }, [previewBody]);

  const isMobile = device === "mobile";
  const viewport = deviceSizes[device];

  const frameBorder = isMobile ? 8 : 7;
  const frameTop = isMobile ? 20 : 0;
  const frameBottom = isMobile ? 16 : 18;
  const standHeight = isMobile ? 0 : 42;

  const reservedWidth = frameBorder * 2;
  const reservedHeight =
    frameBorder * 2 + frameTop + frameBottom + standHeight;

  const scale = Math.max(
    0,
    Math.min(
      (availableSize.width - reservedWidth) / viewport.width,
      (availableSize.height - reservedHeight) / viewport.height,
      1,
    ),
  );

  const screenWidth = viewport.width * scale;
  const screenHeight = viewport.height * scale;
  const frameWidth = screenWidth + reservedWidth;

  return (
    <aside
      aria-label="Landing preview"
      className="hidden min-h-0 min-w-0 flex-col border-l border-slate-200 bg-white xl:flex"
    >
      <div className="shrink-0 border-b border-slate-200 p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-900">
            Live preview
          </h2>

          <button
            type="button"
            onClick={onToggleExpanded}
            aria-expanded={isExpanded}
            className="rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-800 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Your current draft, updated as you edit.
        </p>

        <div
          role="group"
          aria-label="Preview device"
          className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1"
        >
          {(["desktop", "mobile"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={device === option}
              onClick={() => setDevice(option)}
              className={`rounded-md px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${
                device === option
                  ? "bg-white text-sky-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {option === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 bg-gradient-to-b from-sky-50 to-slate-200 p-4">
        <div
          ref={containerRef}
          className="flex h-full min-h-0 items-center justify-center overflow-hidden"
        >
          <div
            className="shrink-0"
            style={{
              width: frameWidth,
              visibility: scale > 0 ? "visible" : "hidden",
            }}
          >
            <div
              className={`overflow-hidden border-slate-900 bg-slate-900 shadow-xl ${
                isMobile ? "rounded-[32px]" : "rounded-xl"
              }`}
              style={{
                borderWidth: frameBorder,
                borderStyle: "solid",
              }}
            >
              <div
                aria-hidden="true"
                className="flex items-center justify-center gap-2"
                style={{ height: frameTop }}
              >
                {isMobile && (
                  <>
                    <span className="h-1 w-10 rounded-full bg-slate-600" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                  </>
                )}
              </div>

              <div
                className={`relative overflow-hidden bg-white ${
                  isMobile ? "rounded-[20px]" : "rounded-sm"
                }`}
                style={{
                  width: screenWidth,
                  height: screenHeight,
                }}
              >
                <iframe
                  title={`${
                    isMobile ? "Mobile" : "Desktop"
                  } landing preview`}
                  srcDoc={previewDocument}
                  sandbox="allow-same-origin"
                  onLoad={(event) => {
                    const body =
                      event.currentTarget.contentDocument?.body;

                    setPreviewBody(body ?? null);
                  }}
                  className="absolute left-0 top-0 block origin-top-left border-0"
                  style={{
                    width: viewport.width,
                    height: viewport.height,
                    transform: `scale(${scale})`,
                  }}
                />
              </div>

              <div
                aria-hidden="true"
                className="flex items-center justify-center"
                style={{ height: frameBottom }}
              >
                {isMobile ? (
                  <span className="h-1 w-16 rounded-full bg-slate-500" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                )}
              </div>
            </div>

            {!isMobile && (
              <div
                aria-hidden="true"
                className="flex flex-col items-center"
              >
                <div className="h-8 w-10 bg-gradient-to-b from-slate-700 to-slate-400" />
                <div className="h-2.5 w-28 rounded-t-lg rounded-b-sm bg-slate-500 shadow-md" />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="shrink-0 border-t border-slate-200 px-4 py-3 text-center text-xs text-slate-500">
        Scroll inside the screen to explore your page.
      </p>

      {previewBody &&
        createPortal(
          <main
            onClickCapture={(event) => event.preventDefault()}
            className="min-h-screen bg-white"
          >
            {blocks.length === 0 ? (
              <p className="p-8 text-center text-sm text-slate-500">
                Add a block to see your landing here.
              </p>
            ) : (
              blocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))
            )}
          </main>,
          previewBody,
        )}
    </aside>
  );
}