import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

import type { LandingBlock } from "@orlune/shared";

import { PropertiesPanel } from "./PropertiesPanel";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { BlockLibrary } from "./BlockLibrary";

import type { BlockContentUpdate } from "../types/landing-block";

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
          blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
        )}
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            ← Projects
          </Link>

          <h1 className="text-lg font-semibold">Landing Editor</h1>
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
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
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

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <BlockLibrary
            onAddHero={addHero}
            onAddCta={addCta}
            onAddFeatures={addFeatures}
          />
        </aside>

        <section
          aria-label="Landing canvas"
          className="min-w-0 bg-slate-100 p-6"
        >
          <div className="mx-auto max-w-4xl space-y-4">
            {blocks.length === 0 && (
              <p className="rounded-xl border-2 border-dashed border-slate-300 p-12 text-center text-slate-500">
                Add a block to start building your landing.
              </p>
            )}
            <AnimatePresence initial={false}>
              {blocks.map((block, index) => (
                <motion.div
                  layout={shouldReduceMotion ? false : "position"}
                  exit={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : -12,
                  }}
                  key={block.id}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.2,
                    ease: "easeOut",
                  }}
                  className={`rounded-xl border bg-white p-5 ${
                    selectedBlockId === block.id
                      ? "border-indigo-500 ring-2 ring-indigo-200"
                      : "border-slate-200"
                  }`}
                >
                  <div className="mb-4 flex gap-3 border-b border-slate-100 pb-3 text-sm">
                    <button
                      type="button"
                      onClick={() => setSelectedBlockId(block.id)}
                      className="font-medium text-indigo-600"
                    >
                      Select
                    </button>

                    <button
                      type="button"
                      onClick={() => moveBlock(block.id, "up")}
                      disabled={index === 0}
                      aria-label="Move block up"
                      className="disabled:opacity-30"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() => moveBlock(block.id, "down")}
                      disabled={index === blocks.length - 1}
                      aria-label="Move block down"
                      className="disabled:opacity-30"
                    >
                      ↓
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteBlock(block.id)}
                      className="ml-auto text-red-600"
                    >
                      Delete
                    </button>
                  </div>

                  <BlockRenderer block={block} isEditing />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <div className="border-l border-slate-200 bg-white p-4">
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
