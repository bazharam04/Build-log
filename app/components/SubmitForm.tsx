"use client";

import { useRef, useState, useTransition } from "react";
import { submitBuildLog } from "@/app/actions";

export default function SubmitForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        await submitBuildLog(formData);
        formRef.current?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-[#161616] border border-[#2a2a2a] rounded-2xl p-6 mb-10 space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">What did you ship? 🚀</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="project_link" className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            Project link <span className="normal-case text-gray-600">(optional)</span>
          </label>
          <input
            id="project_link"
            name="project_link"
            type="url"
            placeholder="https://myproject.com"
            className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          What you shipped
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          placeholder="Shipped a dark-mode toggle, fixed that gnarly auth bug, launched v2..."
          className="bg-[#1f1f1f] border border-[#2e2e2e] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
      >
        {isPending ? "Posting..." : "Post it →"}
      </button>
    </form>
  );
}
