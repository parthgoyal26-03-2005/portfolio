"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Mail } from "lucide-react";
import { SITE } from "@/app/lib/data";
import { FadeIn } from "@/app/components/animations/FadeIn";
import { Section } from "@/app/components/layout/Section";
import { Button } from "@/app/components/ui/Button";
import { FormField } from "@/app/components/ui/FormField";
import { GlassCard } from "@/app/components/ui/GlassCard";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      message: fd.get("message") as string,
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.");
        setStatus("error");
      } else {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      setErrorMsg("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="contact" ambient="purple" className="pt-0!">
      <GlassCard className="relative overflow-hidden rounded-3xl p-6 sm:p-10 md:p-14 lg:p-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)]"
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">
          <FadeIn>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-12 bg-primary" />
              <span className="font-mono-label text-primary">Contact</span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-tight text-on-surface sm:text-4xl md:text-5xl">
              Let&apos;s build <br />
              <span className="text-secondary italic">the future</span> together.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-on-surface-variant sm:text-lg sm:leading-8">
              Open for high-impact collaborations and architectural consulting.
              If you have a vision that requires technical precision,
              let&apos;s talk.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full glass-card transition-colors duration-300 hover:bg-primary/20">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-mono-label text-text-muted">Inquiries</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-base text-on-surface transition-colors hover:text-primary sm:text-lg"
                >
                  {SITE.email}
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <GlassCard
              padding="md"
              rounded="2xl"
              className="relative shadow-2xl sm:p-8 md:p-10"
            >
              <div
                className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-[80px]"
                aria-hidden
              />

              {status === "success" ? (
                <div className="relative z-10 flex flex-col items-center gap-4 py-10 text-center">
                  <CheckCircle className="h-14 w-14 text-emerald-400" />
                  <h3 className="font-display text-xl font-semibold text-on-surface">
                    Message sent!
                  </h3>
                  <p className="font-mono text-sm text-text-muted">
                    I&apos;ll get back to you soon at your email.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 font-mono text-xs text-primary underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  className="relative z-10 space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField name="name" label="Name" placeholder="John Doe" required />
                    <FormField
                      name="email"
                      label="Email"
                      placeholder="john@example.com"
                      type="email"
                      required
                    />
                  </div>
                  <FormField
                    name="message"
                    label="Project Brief"
                    placeholder="Tell me about your vision..."
                    multiline
                    rows={4}
                    required
                  />

                  {status === "error" && (
                    <p className="font-mono text-xs text-rose-400">{errorMsg}</p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full rounded-xl!"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Transmitting…
                      </>
                    ) : (
                      "Transmit Message"
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </FadeIn>
        </div>
      </GlassCard>
    </Section>
  );
}
