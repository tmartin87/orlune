import { Link } from "react-router-dom";

import { RegisterForm } from "../features/auth/RegisterForm";

export function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2">
      <section
        aria-labelledby="register-intro-title"
        className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16"
      >
        <Link
          to="/"
          aria-label="Orlune home"
          className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
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

        <div className="max-w-lg py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
            Your ideas, ready for the web
          </p>

          <h2
            id="register-intro-title"
            className="mt-6 text-5xl font-bold leading-tight tracking-tight xl:text-6xl"
          >
            A place for your next big idea.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
            Start with a few blocks. Add your words and images.
            Publish something that feels like you.
          </p>

          <ol className="mt-12 space-y-6">
            {[
              "Create your first project.",
              "Make it yours with visual blocks.",
              "Publish and share your page.",
            ].map((step, index) => (
              <li key={step} className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-semibold text-indigo-300"
                >
                  {index + 1}
                </span>
                <span className="text-sm text-slate-300">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-xs text-slate-400">
          Build something that moves people.
        </p>
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
            aria-labelledby="register-title"
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
              Your next chapter
            </p>

            <h1
              id="register-title"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Create your account.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Start building your first landing page with Orlune.
            </p>

            <div className="mt-8">
              <RegisterForm />
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="rounded font-semibold text-indigo-600 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </section>
        </div>

        <p className="text-center text-xs text-slate-400">
          Orlune — Your ideas, ready for the web.
        </p>
      </div>
    </main>
  );
}