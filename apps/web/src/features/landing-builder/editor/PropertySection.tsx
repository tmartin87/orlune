import type { ReactNode } from "react";

type PropertySectionProps = {
  title: string;
  children: ReactNode;
};

export function PropertySection({
  title,
  children,
}: PropertySectionProps) {
  return (
    <details className="group min-w-0 rounded-xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 [&::-webkit-details-marker]:hidden">
        {title}

        <span
          aria-hidden="true"
          className="text-slate-400 group-open:rotate-180"
        >
          ▾
        </span>
      </summary>

      <div className="space-y-4 border-t border-slate-100 p-4">
        {children}
      </div>
    </details>
  );
}