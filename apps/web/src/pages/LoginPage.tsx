import { Link } from "react-router-dom";

import { LoginForm } from "../features/auth/LoginForm";

export function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] lg:grid lg:grid-cols-2">
      <section
        aria-labelledby="intro-title"
        className="relative hidden overflow-hidden bg-gradient-to-br from-[#e0f0fa] via-[#c4e0f1] to-[#8ebedc] p-12 text-slate-900 lg:flex lg:flex-col lg:justify-between xl:p-16"
      >
        <Link
          to="/"
          aria-label="Orlune home"
          className="relative z-10 flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
        >
          <img src="/branding/orlune-horizontal.svg" alt="Orlune" width="920" height="280" className="h-11 w-auto" />
        </Link>

        <div className="relative z-10 max-w-lg py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            Your ideas, ready for the web
          </p>

          <h2
            id="intro-title"
            className="mt-6 text-5xl font-bold leading-tight tracking-tight xl:text-6xl"
          >
            A place for your next big idea.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-700">
            Start with a few blocks. Add your words and images.
            Publish something that feels like you.
          </p>

          <div
            aria-hidden="true"
            className="mt-12 max-w-sm rounded-2xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-sky-900/10"
          >
            <div className="mb-5 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-200" />
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span className="h-2 w-2 rounded-full bg-sky-400" />
            </div>

            <div className="rounded-xl bg-sky-50 p-6">
              <div className="h-3 w-3/4 rounded bg-sky-800" />
              <div className="mt-3 h-2 w-full rounded bg-sky-200" />
              <div className="mt-2 h-2 w-2/3 rounded bg-sky-200" />
              <div className="mt-5 h-7 w-24 rounded-lg bg-sky-700" />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-sky-100 bg-white p-3"
                >
                  <div className="h-4 w-4 rounded bg-sky-200" />
                  <div className="mt-3 h-1.5 w-full rounded bg-slate-300" />
                  <div className="mt-2 h-1.5 w-2/3 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-sky-900">
          Build something that moves people.
        </p>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-600/10 blur-3xl"
        />
      </section>

      <div className="flex min-h-screen flex-col px-6 py-8 sm:px-10">
        <Link
          to="/"
          className="w-fit rounded-lg text-sm font-medium text-slate-600 transition-colors hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
        >
          Back to home
        </Link>

        <div className="flex flex-1 items-center justify-center py-12">
          <section
            aria-labelledby="login-title"
            className="w-full max-w-md"
          >
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img src="/branding/orlune-vertical.svg" alt="Orlune" width="640" height="520" className="h-24 w-auto" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">
              Your workspace awaits
            </p>

            <h1
              id="login-title"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Welcome back.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Sign in to continue building your landing pages.
            </p>

            <div className="mt-8">
              <LoginForm />
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="rounded font-semibold text-sky-700 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                Create an account
              </Link>
            </p>
          </section>
        </div>

        <p className="text-center text-xs text-slate-500">
          Orlune — Your ideas, ready for the web.
        </p>
      </div>
    </main>
  );
}