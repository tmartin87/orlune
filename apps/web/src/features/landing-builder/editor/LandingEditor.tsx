import { useState } from "react";
import { Link } from "react-router-dom";

import type { LandingBlock } from "@orlune/shared";

import { PropertiesPanel } from "./PropertiesPanel";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { BlockLibrary } from "./BlockLibrary";

import type { BlockContentUpdate } from "../types/landing-block";

type LandingEditorProps = {
  initialBlocks: LandingBlock[];
  onSave: (blocks: LandingBlock[]) => void;
  isSaving: boolean;
};

export function LandingEditor({
  initialBlocks,
  onSave,
  isSaving,
}: LandingEditorProps) {
  const [blocks, setBlocks] = useState<LandingBlock[]>(initialBlocks);

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    null,
  );

  const [isPreview, setIsPreview] = useState(false);

  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) ?? null;

  const addHero = () => {
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

  const updateBlockContent = (update: BlockContentUpdate) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
        if (
          block.id !== update.blockId ||
          block.type !== update.type
        ) {
          return block;
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
    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== blockId),
    );

    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (
    blockId: string,
    direction: "up" | "down",
  ) => {
    setBlocks((currentBlocks) => {
      const currentIndex = currentBlocks.findIndex(
        (block) => block.id === blockId,
      );

      if (currentIndex === -1) {
        return currentBlocks;
      }

      const targetIndex =
        direction === "up"
          ? currentIndex - 1
          : currentIndex + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= currentBlocks.length
      ) {
        return currentBlocks;
      }

      const reorderedBlocks = [...currentBlocks];

      [
        reorderedBlocks[currentIndex],
        reorderedBlocks[targetIndex],
      ] = [
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
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/projects"
            className="text-sm text-slate-500 hover:text-slate-900"
          >
            ← Projects
          </Link>

          <h1 className="text-lg font-semibold">
            Landing Editor
          </h1>
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
            disabled={isSaving}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_280px]">
        <aside className="border-r border-slate-200 bg-white p-4">
          <BlockLibrary
            onAddHero={addHero}
            onAddCta={addCta}
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

            {blocks.map((block, index) => (
              <div
                key={block.id}
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

                <BlockRenderer block={block} />
              </div>
            ))}
          </div>
        </section>

        <div className="border-l border-slate-200 bg-white p-4">
          {selectedBlock ? (
            <PropertiesPanel
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