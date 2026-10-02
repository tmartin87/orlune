import { LoginForm } from "../features/auth/LoginForm";

export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">
            O
          </span>

          <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
            Orlune
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Your ideas, ready for the web.
          </p>
        </div>

        <section
          aria-labelledby="login-title"
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h1
            id="login-title"
            className="text-2xl font-semibold tracking-tight text-slate-900"
          >
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Sign in to create, edit and publish your landing pages.
          </p>

          <div className="mt-8">
            <LoginForm />
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          Build something that moves people.
        </p>
      </div>
    </main>
  );
}