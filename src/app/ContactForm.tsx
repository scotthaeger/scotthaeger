"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border border-[var(--line)] bg-[var(--bg)] px-3 py-2 text-[var(--ink)] placeholder:text-[var(--dim)] focus:border-[var(--accent)] focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd)),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="text-[var(--accent)]">
        <span>$</span> message sent. Thanks, I&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      <label className="block">
        <span className="label">Name</span>
        <input name="name" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="label">Email</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="label">Message</span>
        <textarea name="message" required minLength={5} maxLength={5000} rows={6} className={field} />
      </label>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--bg)] hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-red-400">{error}</p>
        )}
      </div>
    </form>
  );
}
