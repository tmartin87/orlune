import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

import type { LandingBlock } from "@orlune/shared";

import { PropertiesPanel } from "./PropertiesPanel";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { BlockLibrary } from "./BlockLibrary";

import type { BlockContentUpdate } from "../types/landing-block";

const blockLabels: Record<LandingBlock["type"], string> = {
  hero: "Hero",
  cta: "Call to action",
  features: "Features",
  imageText: "Image and text",
};

type LandingEditorProps = {
  projectId: string;
  initialBlocks: LandingBlock[];
  onSave: (blocks: LandingBlock[]) => void;
  isSaving: boolean;
  onPublish: (blocks: LandingBlock[]) => void;
  isPublishing: boolean;
  feedback: ReactNode;
  onDraftChange: () => void;
};

export function LandingEditor({
  projectId,
  initialBlocks,
  onSave,
  isSaving,
  onPublish,
  isPublishing,
  feedback,
  onDraftChange,
}: LandingEditorProps) {
  const [blocks, setBlocks] = useState<LandingBlock[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) ?? null;

  const addHero = () => {
    onDraftChange();

    const hero: LandingBlock = {
      id: crypto.randomUUID(),
      type: "hero",
      content: {
        heading: "Build something great",
        subheading: "Create your landing page with Orlune.",
        buttonText: "Get started",
      },
    };

    setBlocks((currentBlocks) => [...currentBlocks, hero]);
  };

  const addCta = () => {
    onDraftChange();

    const cta: LandingBlock = {
      id: crypto.randomUUID(),
      type: "cta",
      content: {
        heading: "Ready to get started?",
        buttonText: "Start now",
      },
    };

    setBlocks((currentBlocks) => [...currentBlocks, cta]);
  };

  const addFeatures = () => {
    onDraftChange();

    const features: LandingBlock = {
      id: crypto.randomUUID(),
      type: "features",
      content: {
        heading: "Everything you need",
        items: [
          {
            id: crypto.randomUUID(),
            title: "Easy to use",
            description: "Get started quickly with a simple experience.",
          },
          {
            id: crypto.randomUUID(),
            title: "Made for you",
            description: "Adapt the experience to your needs.",
          },
          {
            id: crypto.randomUUID(),
            title: "Ready to grow",
            description: "Take the next step with confidence.",
          },
        ],
      },
    };

    setBlocks((currentBlocks) => [...currentBlocks, features]);
    setSelectedBlockId(features.id);
  };

  const addImageText = () => {
    onDraftChange();

    const imageText: LandingBlock = {
      id: crypto.randomUUID(),
      type: "imageText",
      content: {
        heading: "Tell your story",
        description: "Show what makes your product or service special.",
        imageUrl: "",
        imageAlt: "",
        imagePosition: "left",
      },
    };

    setBlocks((currentBlocks) => [...currentBlocks, imageText]);
    setSelectedBlockId(imageText.id);
  };

  const updateBlockContent = (update: BlockContentUpdate) => {
    onDraftChange();

    setBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
        if (block.id !== update.blockId || block.type !== update.type) {
          return block;
        }

        if (update.type === "features" && block.type === "features") {
          if (update.field === "heading") {
            return {
              ...block,
              content: {
                ...block.content,
                heading: update.value,
              },
            };
          }

          return {
            ...block,
            content: {
              ...block.content,
              items: block.content.items.map((item) => {
                if (item.id !== update.itemId) {
                  return item;
                }

                return {
                  ...item,
                  [update.field]: update.value,
                };
              }),
            },
          };
        }

        if (update.type === "hero" && block.type === "hero") {
          return {
            ...block,
            content: {
              ...block.content,
              [update.field]: update.value,
            },
          };
        }

        if (update.type === "cta" && block.type === "cta") {
          return {
            ...block,
            content: {
              ...block.content,
              [update.field]: update.value,
            },
          };
        }

        if (update.type === "imageText" && block.type === "imageText") {
          return {
            ...block,
            content: {
              ...block.content,
              [update.field]: update.value,
            },
          };
        }

        return block;
      }),
    );
  };

  const deleteBlock = (blockId: string) => {
    onDraftChange();

    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== blockId),
    );

    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    onDraftChange();

    setBlocks((currentBlocks) => {
      const currentIndex = currentBlocks.findIndex(
        (block) => block.id === blockId,
      );

      if (currentIndex === -1) {
        return currentBlocks;
      }

      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= currentBlocks.length) {
        return currentBlocks;
      }

      const reorderedBlocks = [...currentBlocks];

      [reorderedBlocks[currentIndex], reorderedBlocks[targetIndex]] = [
        reorderedBlocks[targetIndex],
        reorderedBlocks[currentIndex],
      ];

      return reorderedBlocks;
    });
  };

  if (isPreview) {
    return (
      <main className="min-h-screen bg-white">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <p className="text-sm font-medium text-slate-500">
            Preview · current draft
          </p>

          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Back to editor
          </button>
        </header>

        <div
          className="space-y-1 bg-white px-6 py-2"
          aria-label="Save and publish feedback"
        >
          {feedback}
        </div>

        {blocks.length === 0 ? (
          <p className="p-12 text-center text-slate-500">
            No blocks to preview yet.
          </p>
        ) : (
          blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            to="/projects"
            aria-label="Orlune — back to projects"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
          >
            O
          </Link>

          <div className="min-w-0">
            <Link
              to="/projects"
              className="text-xs font-medium text-slate-500 transition-colors hover:text-indigo-600"
            >
              ← All projects
            </Link>
            <h1 className="text-base font-semibold tracking-tight text-slate-900">
              Landing editor
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Preview
          </button>

          <button
            type="button"
            onClick={() => onSave(blocks)}
            disabled={isSaving || isPublishing}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>

          <button
            type="button"
            onClick={() => onPublish(blocks)}
            disabled={isSaving || isPublishing}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
        </div>
      </header>

      <div
        className="space-y-1 bg-white px-6 py-2"
        aria-label="Save and publish feedback"
      >
        {feedback}
      </div>

      <div className="grid flex-1 grid-cols-1 xl:grid-cols-[220px_minmax(0,1fr)_340px]">
        <aside className="border-b border-slate-200 bg-white p-4 xl:border-b-0 xl:border-r">
          <BlockLibrary
            onAddHero={addHero}
            onAddCta={addCta}
            onAddFeatures={addFeatures}
            onAddImageText={addImageText}
          />
        </aside>

        <section
          aria-label="Landing canvas"
          className="min-w-0 bg-slate-100/80 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-5xl space-y-5">
            {blocks.length === 0 && (
              <p className="rounded-xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-500">
                Add a block to start building your landing.
              </p>
            )}

            <AnimatePresence initial={false}>
              {blocks.map((block, index) => (
                <motion.div
                  key={block.id}
                  onClick={() => setSelectedBlockId(block.id)}
                  layout={shouldReduceMotion ? false : "position"}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : -12,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  className={`cursor-pointer rounded-2xl border bg-white p-3 shadow-sm ${
                    selectedBlockId === block.id
                      ? "border-indigo-500 ring-2 ring-indigo-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
                    <button
                      type="button"
                      onClick={() => setSelectedBlockId(block.id)}
                      aria-pressed={selectedBlockId === block.id}
                      className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                        selectedBlockId === block.id
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {blockLabels[block.type]}
                    </button>

                    <div
                      className="ml-auto flex items-center gap-1"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => moveBlock(block.id, "up")}
                        disabled={index === 0}
                        aria-label={`Move ${blockLabels[block.type]} up`}
                        title="Move up"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <span aria-hidden="true">↑</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => moveBlock(block.id, "down")}
                        disabled={index === blocks.length - 1}
                        aria-label={`Move ${blockLabels[block.type]} down`}
                        title="Move down"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <span aria-hidden="true">↓</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteBlock(block.id)}
                        aria-label={`Delete ${blockLabels[block.type]}`}
                        className="ml-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="pointer-events-none">
                    <BlockRenderer block={block} isEditing />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <div className="min-w-0 border-t border-slate-200 bg-white p-6 xl:border-l xl:border-t-0">
          {selectedBlock ? (
            <PropertiesPanel
              key={selectedBlock.id}
              projectId={projectId}
              block={selectedBlock}
              onContentChange={updateBlockContent}
            />
          ) : (
            <p className="text-sm text-slate-500">
              Select a block to edit its properties.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}