type BlockLibraryProps = {
  onAddHero: () => void;
  onAddCta: () => void;
};

export function BlockLibrary({
  onAddHero,
  onAddCta,
}: BlockLibraryProps) {
   return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">
          Blocks
        </h2>
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
          <span className="block text-sm font-medium">
            + Hero
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Introduce your business with a headline.
          </span>
        </button>

        <button
          type="button"
          onClick={onAddCta}
          className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition-colors hover:border-indigo-400 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <span className="block text-sm font-medium">
            + Call to action
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Invite visitors to take the next step.
          </span>
        </button>
      </div>
    </div>
  );
}