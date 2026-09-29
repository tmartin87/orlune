import type { BlockContentUpdate, LandingBlock } from "../types/landing-block";

type PropertiesPanelProps = {
  block: LandingBlock;
  onContentChange: (update: BlockContentUpdate) => void;
};

export function PropertiesPanel({
  block,
  onContentChange,
}: PropertiesPanelProps) {
  if (block.type === "hero") {
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
                type: block.type,
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
                type: block.type,
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
                type: block.type,
                field: "buttonText",
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
                type: block.type,
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
                type: block.type,
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
