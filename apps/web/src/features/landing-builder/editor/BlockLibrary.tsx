type BlockLibraryProps = {
  onAddHero: () => void;
  onAddCta: () => void;
};

export function BlockLibrary({
  onAddHero,
  onAddCta,
}: BlockLibraryProps) {
  return (
    <aside>
      <h2>Blocks</h2>

      <button type="button" onClick={onAddHero}>
        Add Hero
      </button>

      <button type="button" onClick={onAddCta}>
        Add CTA
      </button>
    </aside>
  );
}