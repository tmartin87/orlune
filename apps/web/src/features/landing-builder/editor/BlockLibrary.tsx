import type { ReactNode } from "react";

type BlockLibraryProps = {
  onAddHero: () => void;
  onAddCta: () => void;
  onAddFeatures: () => void;
  onAddImageText: () => void;
};

type BlockOptionProps = {
  title: string;
  description: string;
  onClick: () => void;
  children: ReactNode;
};

function BlockOption({
  title,
  description,
  onClick,
  children,
}: BlockOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Add ${title} block`}
      className="group w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition-colors hover:border-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      <div
        aria-hidden="true"
        className="flex h-20 items-center justify-center border-b border-slate-100 bg-slate-50 px-5 transition-colors group-hover:bg-indigo-50"
      >
        {children}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-slate-800">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-indigo-600"
          >
            +
          </span>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}

export function BlockLibrary({
  onAddHero,
  onAddCta,
  onAddFeatures,
  onAddImageText,
}: BlockLibraryProps) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-slate-900">
          Blocks
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Choose a section to add to your page.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <BlockOption
          title="Hero"
          description="Make a strong first impression."
          onClick={onAddHero}
        >
          <div className="flex w-full flex-col items-center gap-2">
            <div className="h-2 w-3/4 rounded bg-slate-700" />
            <div className="h-1.5 w-full rounded bg-slate-200" />
            <div className="h-1.5 w-2/3 rounded bg-slate-200" />
            <div className="mt-1 h-3 w-10 rounded bg-indigo-500" />
          </div>
        </BlockOption>

        <BlockOption
          title="Features"
          description="Highlight three key benefits."
          onClick={onAddFeatures}
        >
          <div className="grid w-full grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="space-y-2 rounded-md border border-slate-200 bg-white p-2"
              >
                <div className="h-3 w-3 rounded bg-indigo-200" />
                <div className="h-1 w-full rounded bg-slate-300" />
                <div className="h-1 w-3/4 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </BlockOption>

        <BlockOption
          title="Image and text"
          description="Give your story more detail."
          onClick={onAddImageText}
        >
          <div className="grid w-full grid-cols-2 items-center gap-3">
            <div className="flex h-12 items-center justify-center rounded-md bg-indigo-100">
              <div className="h-6 w-6 rounded-full bg-indigo-300" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full rounded bg-slate-600" />
              <div className="h-1 w-full rounded bg-slate-200" />
              <div className="h-1 w-3/4 rounded bg-slate-200" />
            </div>
          </div>
        </BlockOption>

        <BlockOption
          title="Call to action"
          description="Invite visitors to take action."
          onClick={onAddCta}
        >
          <div className="flex w-full flex-col items-center gap-3 rounded-md bg-slate-800 px-4 py-3">
            <div className="h-1.5 w-full rounded bg-slate-400" />
            <div className="h-3 w-10 rounded bg-white" />
          </div>
        </BlockOption>
      </div>
    </div>
  );
}