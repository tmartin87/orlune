type BlockLibraryProps = {
  onAddHero: () => void;
  onAddCta: () => void;
  onAddFeatures: () => void;
  onAddImageText: () => void;
};

export function BlockLibrary({
  onAddHero,
  onAddCta,
  onAddFeatures,
  onAddImageText,
}: BlockLibraryProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">Blocks</h2>
        <p className="mt-1 text-xs text-slate-500">
          Choose a block to add to your landing.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={onAddHero}
          className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <span className="block text-sm font-medium">+ Hero</span>
          <span className="mt-1 block text-xs text-slate-500">
            Introduce your business with a headline.
          </span>
        </button>

        <button
          type="button"
          onClick={onAddCta}
          className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <span className="block text-sm font-medium">+ Call to action</span>
          <span className="mt-1 block text-xs text-slate-500">
            Invite visitors to take the next step.
          </span>
        </button>
        <button
          type="button"
          onClick={onAddFeatures}
          className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <span className="block text-sm font-medium">+ Features</span>
          <span className="mt-1 block text-xs text-slate-500">
            Highlight three benefits of your product or service.
          </span>
        </button>
        <button
          type="button"
          onClick={onAddImageText}
          className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <span className="block text-sm font-medium">+ Image and text</span>
          <span className="mt-1 block text-xs text-slate-500">
            Tell your story with an image and a description.
          </span>
        </button>
      </div>
    </div>
  );
}
