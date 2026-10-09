import type {
  BlockContentUpdate,
  LandingBlock,
} from "../types/landing-block";
import { HeroImageUpload } from "./HeroImageUpload";
import { PropertySection } from "./PropertySection";

type PropertiesPanelProps = {
  projectId: string;
  block: LandingBlock;
  onContentChange: (update: BlockContentUpdate) => void;
};

const fieldClassName =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60";

const labelClassName =
  "block space-y-2 text-sm font-medium text-slate-700";

export function PropertiesPanel({
  projectId,
  block,
  onContentChange,
}: PropertiesPanelProps) {
  if (block.type === "hero") {
    const isBackground = block.content.layout === "background";
    const isSplit =
      block.content.layout === "split" &&
      Boolean(block.content.imageUrl?.trim());

    return (
      <aside className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Hero
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Edit your opening section.
          </p>
        </div>

        <PropertySection title="Content">
          <label className={labelClassName}>
            Heading
            <input
              type="text"
              className={fieldClassName}
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

          <label className={labelClassName}>
            Subheading
            <textarea
              rows={3}
              className={`${fieldClassName} resize-y`}
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

          <label className={labelClassName}>
            Button text
            <input
              type="text"
              className={fieldClassName}
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

          <label className={labelClassName}>
            Button URL
            <input
              type="url"
              placeholder="https://example.com"
              className={fieldClassName}
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
        </PropertySection>

        <PropertySection title="Design">
          <label className={labelClassName}>
            Layout
            <select
              className={fieldClassName}
              value={block.content.layout ?? "centered"}
              onChange={(event) => {
                const layout = event.target.value;

                if (
                  layout !== "centered" &&
                  layout !== "split" &&
                  layout !== "background"
                ) {
                  return;
                }

                onContentChange({
                  blockId: block.id,
                  type: "hero",
                  field: "layout",
                  value: layout,
                });
              }}
            >
              <option value="centered">Centered</option>
              <option value="split">Image beside text</option>
              <option value="background">Background image</option>
            </select>
          </label>

          <label className={labelClassName}>
            Text alignment
            <select
              className={fieldClassName}
              value={
                block.content.alignment ??
                (isSplit ? "left" : "center")
              }
              onChange={(event) => {
                const alignment = event.target.value;

                if (alignment !== "left" && alignment !== "center") {
                  return;
                }

                onContentChange({
                  blockId: block.id,
                  type: "hero",
                  field: "alignment",
                  value: alignment,
                });
              }}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
            </select>
          </label>

          <label className={labelClassName}>
            Color theme
            <select
              className={fieldClassName}
              disabled={isBackground}
              value={
                isBackground
                  ? "dark"
                  : block.content.theme ?? "light"
              }
              onChange={(event) => {
                const theme = event.target.value;

                if (theme !== "light" && theme !== "dark") {
                  return;
                }

                onContentChange({
                  blockId: block.id,
                  type: "hero",
                  field: "theme",
                  value: theme,
                });
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            {isBackground && (
              <span className="block text-xs font-normal text-slate-500">
                Background images always use the dark theme for readability.
              </span>
            )}
          </label>
        </PropertySection>

        <PropertySection title="Image">
          <HeroImageUpload
            projectId={projectId}
            imageUrl={block.content.imageUrl}
            imageAlt={block.content.imageAlt}
            onUploaded={(url) =>
              onContentChange({
                blockId: block.id,
                type: "hero",
                field: "imageUrl",
                value: url,
              })
            }
          />

          <label className={labelClassName}>
            Image URL
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClassName}
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

          <label className={labelClassName}>
            Image description
            <input
              type="text"
              placeholder="Describe what the image shows"
              className={fieldClassName}
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
        </PropertySection>
      </aside>
    );
  }

  if (block.type === "cta") {
    return (
      <aside className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Call to action
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Invite visitors to take the next step.
          </p>
        </div>

        <PropertySection title="Content">
          <label className={labelClassName}>
            Heading
            <input
              type="text"
              className={fieldClassName}
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

          <label className={labelClassName}>
            Button text
            <input
              type="text"
              className={fieldClassName}
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

          <label className={labelClassName}>
            Button URL
            <input
              type="url"
              placeholder="https://example.com"
              className={fieldClassName}
              value={block.content.buttonUrl ?? ""}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "cta",
                  field: "buttonUrl",
                  value: event.target.value,
                })
              }
            />
          </label>
        </PropertySection>

        <PropertySection title="Design">
          <label className={labelClassName}>
            Color theme
            <select
              className={fieldClassName}
              value={block.content.theme ?? "dark"}
              onChange={(event) => {
                const theme = event.target.value;

                if (theme !== "light" && theme !== "dark") {
                  return;
                }

                onContentChange({
                  blockId: block.id,
                  type: "cta",
                  field: "theme",
                  value: theme,
                });
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </PropertySection>
      </aside>
    );
  }

  if (block.type === "features") {
    return (
      <aside className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Features
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Highlight three benefits.
          </p>
        </div>

        <PropertySection title="Content">
          <label className={labelClassName}>
            Section heading
            <input
              type="text"
              className={fieldClassName}
              value={block.content.heading}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "features",
                  field: "heading",
                  value: event.target.value,
                })
              }
            />
          </label>
        </PropertySection>

        {block.content.items.map((item, index) => (
          <PropertySection
            key={item.id}
            title={`Feature ${index + 1}`}
          >
            <label className={labelClassName}>
              Title
              <input
                type="text"
                className={fieldClassName}
                value={item.title}
                onChange={(event) =>
                  onContentChange({
                    blockId: block.id,
                    type: "features",
                    field: "title",
                    itemId: item.id,
                    value: event.target.value,
                  })
                }
              />
            </label>

            <label className={labelClassName}>
              Description
              <textarea
                rows={3}
                className={`${fieldClassName} resize-y`}
                value={item.description}
                onChange={(event) =>
                  onContentChange({
                    blockId: block.id,
                    type: "features",
                    field: "description",
                    itemId: item.id,
                    value: event.target.value,
                  })
                }
              />
            </label>
          </PropertySection>
        ))}
      </aside>
    );
  }

  if (block.type === "imageText") {
    return (
      <aside className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Image and text
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Tell your story with words and images.
          </p>
        </div>

        <PropertySection title="Content">
          <label className={labelClassName}>
            Heading
            <input
              type="text"
              className={fieldClassName}
              value={block.content.heading}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "imageText",
                  field: "heading",
                  value: event.target.value,
                })
              }
            />
          </label>

          <label className={labelClassName}>
            Description
            <textarea
              rows={5}
              className={`${fieldClassName} resize-y`}
              value={block.content.description}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "imageText",
                  field: "description",
                  value: event.target.value,
                })
              }
            />
          </label>
        </PropertySection>

        <PropertySection title="Design">
          <label className={labelClassName}>
            Image position
            <select
              className={fieldClassName}
              value={block.content.imagePosition ?? "left"}
              onChange={(event) => {
                const position = event.target.value;

                if (position !== "left" && position !== "right") {
                  return;
                }

                onContentChange({
                  blockId: block.id,
                  type: "imageText",
                  field: "imagePosition",
                  value: position,
                });
              }}
            >
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
        </PropertySection>

        <PropertySection title="Image">
          <HeroImageUpload
            projectId={projectId}
            imageUrl={block.content.imageUrl}
            imageAlt={block.content.imageAlt}
            onUploaded={(url) =>
              onContentChange({
                blockId: block.id,
                type: "imageText",
                field: "imageUrl",
                value: url,
              })
            }
          />

          <label className={labelClassName}>
            Image URL
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className={fieldClassName}
              value={block.content.imageUrl ?? ""}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "imageText",
                  field: "imageUrl",
                  value: event.target.value,
                })
              }
            />
          </label>

          <label className={labelClassName}>
            Image description
            <input
              type="text"
              placeholder="Describe what the image shows"
              className={fieldClassName}
              value={block.content.imageAlt ?? ""}
              onChange={(event) =>
                onContentChange({
                  blockId: block.id,
                  type: "imageText",
                  field: "imageAlt",
                  value: event.target.value,
                })
              }
            />
          </label>
        </PropertySection>
      </aside>
    );
  }

  return null;
}