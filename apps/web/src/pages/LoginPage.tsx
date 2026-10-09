import { Link } from "react-router-dom";

import { LoginForm } from "../features/auth/LoginForm";

export function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <section
        aria-labelledby="intro-title"
        className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16"
      >
        <Link
          to="/"
          aria-label="Orlune home"
          className="relative z-10 flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold"
          >
            O
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Orlune
          </span>
        </Link>

        <div className="relative z-10 max-w-lg py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Your ideas, ready for the web
          </p>

          <h2
            id="intro-title"
            className="mt-6 text-5xl font-bold leading-tight tracking-tight xl:text-6xl"
          >
            A place for your next big idea.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
            Start with a few blocks. Add your words and images.
            Publish something that feels like you.
          </p>

          <div
            aria-hidden="true"
            className="mt-12 max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-5 shadow-xl"
          >
            <div className="mb-5 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-600" />
              <span className="h-2 w-2 rounded-full bg-slate-600" />
              <span className="h-2 w-2 rounded-full bg-slate-600" />
            </div>

            <div className="rounded-xl bg-indigo-500/15 p-6">
              <div className="h-3 w-3/4 rounded bg-indigo-200" />
              <div className="mt-3 h-2 w-full rounded bg-slate-600" />
              <div className="mt-2 h-2 w-2/3 rounded bg-slate-600" />
              <div className="mt-5 h-7 w-24 rounded-lg bg-indigo-500" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-700 p-3"
                >
                  <div className="h-4 w-4 rounded bg-indigo-400/40" />
                  <div className="mt-3 h-1.5 w-full rounded bg-slate-600" />
                  <div className="mt-2 h-1.5 w-2/3 rounded bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-slate-400">
          Build something that moves people.
        </p>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl"
        />
      </section>

      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-10">
        <Link
          to="/"
          className="w-fit rounded-lg text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
        >
          Back to home
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <section
            aria-labelledby="login-title"
            className="w-full max-w-md"
          >
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white"
              >
                O
              </span>
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                Orlune
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Your workspace awaits
            </p>

            <h1
              id="login-title"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Welcome back.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Sign in to continue building your landing pages.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>
          </section>
        </div>

        <p className="text-center text-xs text-slate-400">
          Orlune — Your ideas, ready for the web.
        </p>
      </div>
    </main>
  );
}