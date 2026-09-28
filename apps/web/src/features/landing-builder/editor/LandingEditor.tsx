import { useState } from "react";

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
  const [blocks, setBlocks] =
    useState<LandingBlock[]>(initialBlocks);

  const [selectedBlockId, setSelectedBlockId] =
    useState<string | null>(null);

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

    setBlocks((currentBlocks) => [
      ...currentBlocks,
      hero,
    ]);
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

    setBlocks((currentBlocks) => [
      ...currentBlocks,
      cta,
    ]);
  };

  const updateBlockContent = (
    update: BlockContentUpdate,
  ) => {
    setBlocks((currentBlocks) =>
      currentBlocks.map((block) => {
        if (
          block.id !== update.blockId ||
          block.type !== update.type
        ) {
          return block;
        }

        if (
          update.type === "hero" &&
          block.type === "hero"
        ) {
          return {
            ...block,
            content: {
              ...block.content,
              [update.field]: update.value,
            },
          };
        }

        if (
          update.type === "cta" &&
          block.type === "cta"
        ) {
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
      currentBlocks.filter(
        (block) => block.id !== blockId,
      ),
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

  return (
    <main>
      <h1>Landing Editor</h1>

      <BlockLibrary
        onAddHero={addHero}
        onAddCta={addCta}
      />

      <button
        type="button"
        onClick={() => onSave(blocks)}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>

      {blocks.map((block, index) => (
        <div key={block.id}>
          <button
            type="button"
            onClick={() =>
              setSelectedBlockId(block.id)
            }
          >
            Select
          </button>

          <button
            type="button"
            onClick={() =>
              moveBlock(block.id, "up")
            }
            disabled={index === 0}
          >
            ↑
          </button>

          <button
            type="button"
            onClick={() =>
              moveBlock(block.id, "down")
            }
            disabled={index === blocks.length - 1}
          >
            ↓
          </button>

          <button
            type="button"
            onClick={() => deleteBlock(block.id)}
          >
            Delete
          </button>

          <BlockRenderer block={block} />
        </div>
      ))}

      {selectedBlock && (
        <PropertiesPanel
          block={selectedBlock}
          onContentChange={updateBlockContent}
        />
      )}
    </main>
  );
}