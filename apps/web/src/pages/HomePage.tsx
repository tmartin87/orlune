import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] text-slate-900">
      <div className="bg-gradient-to-br from-[#e0f0fa] via-[#c4e0f1] to-[#8ebedc]">
        <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link
            to="/"
            aria-label="Orlune home"
            className="flex items-center gap-3 rounded-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          >
            <img src="/branding/orlune-horizontal.svg" alt="Orlune" width="920" height="280" className="h-11 w-auto" />
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            Sign in
          </Link>
        </header>

        <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-800">
            Your ideas, ready for the web
          </p>

          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Give your next idea a place to shine.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Build a landing page with visual blocks. Make it yours with
            images, layouts and colors, then publish it with a link.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              Open the editor
            </Link>

            <a
              href="#how-it-works"
              className="rounded-xl border border-sky-200 bg-white px-6 py-3 font-semibold text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
            >
              How it works
            </a>
          </div>
        </section>
      </div>

      <section
        aria-labelledby="example-heading"
        className="mx-auto max-w-6xl px-6 pb-8 pt-16 sm:pt-20"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-700">
            Made with blocks
          </p>

          <h2
            id="example-heading"
            className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            A small idea. A page of its own.
          </h2>

          <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
            Combine a hero, features and a call to action to tell your story.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-xl shadow-sky-900/10">
          <div className="flex items-center gap-4 border-b border-sky-100 bg-white px-4 py-3">
            <div aria-hidden="true" className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            </div>

            <span className="text-xs text-slate-600">
              Example landing · Studio North
            </span>
          </div>

          <div className="bg-stone-50 px-6 py-12 text-slate-900 sm:px-12 sm:py-16">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">
                  Studio North
                </p>

                <h3 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  Good design starts with a conversation.
                </h3>

                <p className="mt-5 max-w-md leading-relaxed text-slate-600">
                  An independent studio helping ambitious ideas become
                  thoughtful digital experiences.
                </p>

                <span className="mt-7 inline-block rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white">
                  Let’s talk
                </span>
              </div>

              <div
                aria-hidden="true"
                className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-sky-100"
              >
                <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-sky-200" />
                <div className="absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-[#b2d5eb]" />

                <div className="relative flex h-44 w-44 -rotate-12 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-sky-800 shadow-xl shadow-sky-900/20 sm:h-56 sm:w-56">
                  <div className="h-20 w-20 rounded-full border-[16px] border-white sm:h-28 sm:w-28" />
                </div>
              </div>
            </div>

            <div className="mt-12 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-3">
              {[
                {
                  title: "Clear direction",
                  description:
                    "A shared vision from the first conversation.",
                },
                {
                  title: "Thoughtful details",
                  description: "Every element has a purpose.",
                },
                {
                  title: "Built together",
                  description: "An open process from start to finish.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl bg-white p-5"
                >
                  <h4 className="font-semibold">
                    {feature.title}
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 py-16"
      >
        <h2 className="text-3xl font-bold tracking-tight">
          From an idea to a published page.
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Create",
              description:
                "Start a project and add the blocks your story needs.",
            },
            {
              number: "02",
              title: "Personalize",
              description:
                "Edit your text, upload images and choose your layouts.",
            },
            {
              number: "03",
              title: "Publish",
              description:
                "Preview your page and share the published version with a link.",
            },
          ].map((step) => (
            <article
              key={step.number}
              className="border-t border-sky-200 pt-6"
            >
              <span className="text-sm font-semibold text-sky-700">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-8 text-sm text-slate-600">
        Orlune — Build something that moves people.
      </footer>
    </main>
  );
}