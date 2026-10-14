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
    <section
      aria-label={title}
      className="grid grid-cols-1 items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2 md:[&>div:first-child]:row-span-2"
    >
      {children}
    </section>
  );
}