import type {
  BlockContentUpdate,
  LandingBlock,
} from "../types/landing-block";

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
      <aside>
        <h2>Properties</h2>

        <label>
          Heading
          <input
            type="text"
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

        <label>
          Subheading
          <input
            type="text"
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

        <label>
          Button text
          <input
            type="text"
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
      <aside>
        <h2>Properties</h2>

        <label>
          Heading
          <input
            type="text"
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

        <label>
          Button text
          <input
            type="text"
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