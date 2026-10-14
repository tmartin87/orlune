import {
  Children,
  isValidElement,
  useId,
  useState,
  type ReactNode,
} from "react";

type PropertyTabsProps = {
  children: ReactNode;
  isExpanded: boolean;
  onToggleExpanded: () => void;
};

export function PropertyTabs({
  children,
  isExpanded,
  onToggleExpanded,
}: PropertyTabsProps) {
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const items = Children.toArray(children);
  const heading = items[0];
  const sections = items.slice(1).filter(
    (item) =>
      isValidElement<{ title: string }>(item) &&
      typeof item.props.title === "string",
  );
  const selectedIndex = Math.min(activeIndex, sections.length - 1);

  return (
    <aside className="relative flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-4 px-5 pb-2 pt-3">
        {heading}
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={id}
          onClick={onToggleExpanded}
          className="shrink-0 rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold text-sky-800 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Block properties"
        className="relative z-10 order-first -mt-10 flex h-10 w-fit shrink-0 items-end gap-1 pl-0 pr-0 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-0 before:top-2 before:bg-[#edf6fc] before:content-['']"
      >
        {sections.map((section, index) => {
          if (!isValidElement<{ title: string }>(section)) return null;

          return (
            <button
              key={index}
              id={id + "-tab-" + index}
              type="button"
              role="tab"
              aria-selected={isExpanded && selectedIndex === index}
              aria-controls={id + "-panel-" + index}
              tabIndex={selectedIndex === index ? 0 : -1}
              onClick={() => { setActiveIndex(index); if (!isExpanded) onToggleExpanded(); }}
              onKeyDown={(event) => {
                let nextIndex: number;

                if (event.key === "ArrowRight") {
                  nextIndex = (index + 1) % sections.length;
                } else if (event.key === "ArrowLeft") {
                  nextIndex = (index - 1 + sections.length) % sections.length;
                } else if (event.key === "Home") {
                  nextIndex = 0;
                } else if (event.key === "End") {
                  nextIndex = sections.length - 1;
                } else {
                  return;
                }

                event.preventDefault();
                setActiveIndex(nextIndex);
                if (!isExpanded) onToggleExpanded();
                const buttons =
                  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                    '[role="tab"]',
                  );
                buttons?.[nextIndex]?.focus();
              }}
              className={
                "relative flex h-10 min-w-0 cursor-pointer items-center justify-center rounded-t-md border border-b-0 px-3 text-xs font-medium transition-colors sm:px-5 sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 " +
                (isExpanded && selectedIndex === index
                  ? "border-sky-200 bg-[#edf6fc] text-sky-900 after:absolute after:-bottom-px after:left-0 after:right-0 after:h-px after:bg-[#edf6fc] after:content-['']"
                  : "border-sky-200 bg-[#c4e0f1] text-sky-800 hover:bg-[#dceef9]")
              }
            >
              {section.props.title}
            </button>
          );
        })}
      </div>

      <div id={id} hidden={!isExpanded} className="px-5 pb-4 pt-1">
        {sections.map((section, index) => (
          <div
            key={index}
            id={id + "-panel-" + index}
            role="tabpanel"
            aria-labelledby={id + "-tab-" + index}
            hidden={selectedIndex !== index}
          >
            {section}
          </div>
        ))}
      </div>
    </aside>
  );
}
