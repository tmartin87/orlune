import { Link } from "react-router-dom";

import { RegisterForm } from "../features/auth/RegisterForm";

export function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f5f9fc] lg:grid lg:grid-cols-2">
      <section
        aria-labelledby="register-intro-title"
        className="hidden bg-gradient-to-br from-[#e0f0fa] via-[#c4e0f1] to-[#8ebedc] p-12 text-slate-900 lg:flex lg:flex-col lg:justify-between xl:p-16"
      >
        <Link
          to="/"
          aria-label="Orlune home"
          className="flex w-fit items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700"
        >
          <img src="/branding/orlune-horizontal.svg" alt="Orlune" width="920" height="280" className="h-11 w-auto" />
        </Link>

        <div className="max-w-lg py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-sky-800">
            Your ideas, ready for the web
          </p>

          <h2
            id="register-intro-title"
            className="mt-6 text-5xl font-bold leading-tight tracking-tight xl:text-6xl"
          >
            A place for your next big idea.
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-700">
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
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/80 text-sm font-semibold text-sky-800"
                >
                  {index + 1}
                </span>

                <span className="text-sm text-slate-700">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-xs text-sky-900">
          Build something that moves people.
        </p>
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
            aria-labelledby="register-title"
            className="w-full max-w-md"
          >
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <img src="/branding/orlune-vertical.svg" alt="Orlune" width="640" height="520" className="h-24 w-auto" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-sky-700">
              Your next chapter
            </p>

            <h1
              id="register-title"
              className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Create your account.
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Start building your first landing page with Orlune.
            </p>

            <div className="mt-8">
              <RegisterForm />
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="rounded font-semibold text-sky-700 hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                Sign in
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