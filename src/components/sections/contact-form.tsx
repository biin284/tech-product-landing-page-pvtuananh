"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("botcheck")) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: "New SmartWatch inquiry",
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-lg font-semibold">Thanks — we got it.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll get back to you within 1–2 business days.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-muted-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === "submitting"}
          className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-muted-foreground">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === "submitting"}
          className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          disabled={status === "submitting"}
          className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-50"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      ) : null}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
