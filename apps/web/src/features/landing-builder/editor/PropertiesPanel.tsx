import type { BlockContentUpdate, LandingBlock } from "../types/landing-block";

type PropertiesPanelProps = {
  projectId: string;
  block: LandingBlock;
  onContentChange: (update: BlockContentUpdate) => void;
};
import { HeroImageUpload } from "./HeroImageUpload";

export function PropertiesPanel({
  projectId,
  block,
  onContentChange,
}: PropertiesPanelProps) {
  if (block.type === "hero") {
    return (
      <aside className="space-y-5">
        <h2 className="text-sm font-semibold text-slate-900">Properties</h2>
        <HeroImageUpload
          projectId={projectId}
          onUploaded={(url) =>
            onContentChange({
              blockId: block.id,
              type: "hero",
              field: "imageUrl",
              value: url,
            })
          }
        />

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Heading
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.heading}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "heading",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Subheading
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.subheading}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "subheading",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Button text
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.buttonText}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "buttonText",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Button URL
          <input
            type="url"
            placeholder="https://example.com"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.buttonUrl ?? ""}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "buttonUrl",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Image URL
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.imageUrl ?? ""}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "imageUrl",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Image description
          <input
            type="text"
            placeholder="Describe what the image shows"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.imageAlt ?? ""}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "imageAlt",
                value: event.target.value,
              })
            }
          />
        </label>
      </aside>
    );
  }

  if (block.type === "cta") {
    return (
      <aside className="space-y-5">
        <h2 className="text-sm font-semibold text-slate-900">Properties</h2>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Heading
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.heading}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "cta",
                field: "heading",
                value: event.target.value,
              })
            }
          />
        </label>

        <label className="block space-y-2 text-sm font-medium text-slate-700">
          Button text
          <input
            type="text"
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={block.content.buttonText}
            onChange={(event) =>
              onContentChange({
                blockId: block.id,
                type: "cta",
                field: "buttonText",
                value: event.target.value,
              })
            }
          />
        </label>
      </aside>
    );
  }

  return null;
}
