import type { LandingBlock } from "../types/landing-block";

type BlockRendererProps = {
  block: LandingBlock;
};

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "hero":
      return (
        <section className="rounded-lg bg-slate-50 px-6 py-16 text-center">
          <h1 className="mx-auto max-w-2xl break-words text-4xl font-bold tracking-tight text-slate-900">
            {block.content.heading}
          </h1>

          <p className="mx-auto mt-5 max-w-xl break-words text-lg leading-relaxed text-slate-600">
            {block.content.subheading}
          </p>

          <button
            type="button"
            className="mt-8 max-w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white break-words hover:bg-indigo-700"
          >
            {block.content.buttonText}
          </button>
        </section>
      );

    case "cta":
      return (
        <section className="rounded-lg bg-slate-900 px-6 py-12 text-center">
          <h2 className="mx-auto max-w-xl break-words text-2xl font-semibold text-white">
            {block.content.heading}
          </h2>

          <button
            type="button"
            className="mt-6 max-w-full rounded-lg bg-white px-6 py-3 font-medium text-slate-900 break-words hover:bg-slate-100"
          >
            {block.content.buttonText}
          </button>
        </section>
      );
  }
}