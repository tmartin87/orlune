import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] text-slate-900">
      <div className="flex min-h-dvh flex-col bg-gradient-to-br from-[#e0f0fa] via-[#c4e0f1] to-[#8ebedc]">
        <header className="relative z-10 shrink-0 border-b border-sky-200/60 bg-white/80 shadow-md shadow-sky-900/10">
          <div className="mx-auto flex w-full max-w-[1720px] flex-wrap items-center justify-between gap-4 px-6 py-6 lg:px-10">
          <Link
            to="/"
            aria-label="Orlune home"
            className="flex items-center gap-3 rounded-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          >
            <img src="/branding/orlune-horizontal.svg" alt="Orlune" width="920" height="280" className="h-11 w-auto" />
          </Link>

          <nav aria-label="Account" className="flex items-center gap-3">
            <Link
              to="/login"
              className="whitespace-nowrap rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="whitespace-nowrap rounded-lg border border-sky-700 bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-sky-800 hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
            >
              Sign up
            </Link>
          </nav>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-[1720px] flex-1 content-center items-center gap-10 px-6 py-16 sm:py-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 lg:px-10">
          <div className="min-w-0">
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
                to="/register"
                className="rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
              >
                Create your first landing
              </Link>

              <a
                href="#how-it-works"
                className="rounded-xl border border-sky-200 bg-white px-6 py-3 font-semibold text-sky-800 transition-colors hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
              >
                How it works
              </a>
            </div>
          </div>
          <div className="min-w-0 overflow-hidden rounded-xl border border-white/70 bg-white shadow-2xl shadow-sky-950/15">
            <img
              src="/images/orlune-editor-preview.png"
              alt="Orlune editor showing the block library, Studio North hero, design controls and mobile live preview"
              width="1913"
              height="943"
              className="h-auto w-full"
            />
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

          <a
            href="https://orlune-2t8d.onrender.com/p/cmv6fxtqq00003tdftry097cz"
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
          >
            <img
              src="/images/studio-north-preview.png"
              alt="Studio North landing page with a photographic hero and its services section"
              width="1903"
              height="942"
              loading="lazy"
              className="h-auto w-full"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 bg-white px-6 py-4">
              <span className="text-sm text-slate-600">Built with Orlune · Studio North</span>
              <span className="font-semibold text-sky-700 group-hover:underline">View live page ↗</span>
            </div>
          </a>
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
              className="rounded-2xl border border-sky-200 bg-white p-6 sm:p-8"
            >
              <span className="text-sm font-semibold text-sky-700">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 leading-relaxed text-slate-700">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-600">
        Orlune — Build something that moves people.
      </footer>
    </main>
  );
}
