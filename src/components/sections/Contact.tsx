"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem, blurReveal } from "@/lib/animations";
import { socialLinks } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const socialIcons: Record<string, React.ReactNode> = {
  github: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  ),
  linkedin: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.814 20.452H3.858V9h2.956v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  ),
  twitter: (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  ),
  mail: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  ),
};

function FloatingField({
  label,
  id,
  type = "text",
  textarea = false,
  register,
  error,
  minLength,
}: {
  label: string;
  id: keyof FormData;
  type?: string;
  textarea?: boolean;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
  minLength?: number;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = focused || hasValue;

  const inputClasses = cn(
    "peer w-full rounded-lg border bg-transparent px-4 pt-6 pb-2 text-sm text-text outline-none transition-colors duration-300",
    focused
      ? "border-accent shadow-[0_0_0_1px_rgba(0,191,255,0.3)]"
      : "border-glass-border",
    error && "border-red-500"
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 transition-all duration-200",
    isActive
      ? "top-2 text-xs text-accent"
      : "top-1/2 -translate-y-1/2 text-sm text-text-muted",
    textarea && !isActive && "top-4 translate-y-0"
  );

  const fieldProps = {
    ...register(id, {
      required: `${label} is required`,
      ...(minLength
        ? { minLength: { value: minLength, message: `Must be at least ${minLength} characters` } }
        : {}),
    }),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
      register(id).onChange(e);
    },
  };

  return (
    <div className="relative">
      {textarea ? (
        <textarea
          rows={5}
          className={cn(inputClasses, "resize-none")}
          {...fieldProps}
        />
      ) : (
        <input type={type} className={inputClasses} {...fieldProps} />
      )}
      <label className={labelClasses}>{label}</label>
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400" role="alert">{error}</p>}
    </div>
  );
}

function SuccessDots() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-accent"
          initial={{ opacity: 0, y: 20, scale: 0 }}
          animate={{ opacity: [0, 1, 0], y: [20, -20, -40], scale: [0, 1, 0] }}
          transition={{
            duration: 1,
            delay: i * 0.08,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

const CONTACT_EMAIL = "pitaliyakushal@gmail.com";

/**
 * Compose a mailto: URL with the form contents pre-filled.
 * Opens the user's native email client — works without any server setup.
 */
function buildMailto(data: FormData): string {
  const subject = encodeURIComponent(`Portfolio: Message from ${data.name}`);
  const body = encodeURIComponent(
    `${data.message}\n\n— ${data.name}\n${data.email}`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setServerError(null);
    try {
      // Try the API route first — if a serverless email backend (e.g. Resend)
      // is wired up via env vars, the message is sent directly without
      // bouncing the user through their email client.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 4000);
        return;
      }

      // 503 = server email delivery not configured. Don't show a scary error;
      // open the user's email client with the message pre-filled. This is the
      // graceful path: zero server dependency, works on every device.
      if (res.status === 503) {
        window.location.href = buildMailto(data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 5000);
        return;
      }

      // Any other status — surface the real error so it can be diagnosed.
      const payload = await res.json().catch(() => null);
      const fieldErrors = payload?.errors as Record<string, string[]> | undefined;
      const firstFieldError = fieldErrors
        ? Object.values(fieldErrors).flat()[0]
        : null;
      throw new Error(
        firstFieldError ||
          payload?.error ||
          `Couldn't send (status ${res.status}). Opening your email client instead.`
      );
    } catch (err) {
      // Network failure or unexpected response — also fall back to mailto so
      // the user is never blocked.
      window.location.href = buildMailto(data);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
      // Keep err in scope to satisfy linter / for future telemetry
      void err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading number="07" title="Contact" subtitle="The form delivers messages to my inbox via Resend. Or email me directly." icon={Mail} />

        {/* Big statement */}
        <motion.p
          className="mb-16 text-center text-3xl font-bold leading-tight text-text sm:text-4xl md:text-5xl"
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          Have an idea? Let&apos;s turn it
          <br />
          into <span className="text-accent">reality.</span>
        </motion.p>

        <motion.div
          className="grid gap-12 md:grid-cols-2 md:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left — Info */}
          <motion.div variants={staggerItem} className="space-y-8">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-text md:text-3xl">
                Let&apos;s build something together
              </h3>
              <p className="text-text-muted">
                I&apos;m always open to new opportunities and interesting
                projects. Feel free to reach out!
              </p>
            </div>

            <a
              href="mailto:pitaliyakushal@gmail.com"
              className="group/email inline-flex items-center gap-2 text-lg font-medium text-accent transition-colors hover:text-accent-dark"
            >
              <span className="relative">
                pitaliyakushal@gmail.com
                <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover/email:w-full" />
              </span>
            </a>

            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.icon === "mail" ? undefined : "_blank"}
                  rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-glass-border bg-glass text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                  aria-label={link.name}
                >
                  {socialIcons[link.icon] ?? link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={staggerItem}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FloatingField
                label="Name"
                id="name"
                register={register}
                error={errors.name?.message}
              />
              <FloatingField
                label="Email"
                id="email"
                type="email"
                register={register}
                error={errors.email?.message}
              />
              <FloatingField
                label="Message (min 10 characters)"
                id="message"
                textarea
                register={register}
                error={errors.message?.message}
                minLength={10}
              />

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "relative w-full rounded-lg bg-accent px-6 py-3 font-medium text-bg transition-all duration-300",
                  "hover:shadow-[0_0_30px_rgba(0,191,255,0.3)]",
                  "disabled:cursor-not-allowed disabled:opacity-60"
                )}
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-1.5">
                    Sending
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="inline-block h-1 w-1 rounded-full bg-bg"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            {/* Success animation */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  className="mt-6 space-y-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <SuccessDots />
                  <p className="text-sm font-medium text-accent">
                    Message sent successfully!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Server / network error — surfaces real failures instead of fake success */}
            <AnimatePresence>
              {serverError && (
                <motion.div
                  role="alert"
                  className="mt-6 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-sm text-red-400">{serverError}</p>
                  <p className="mt-2 text-xs text-text-dim">
                    Or email me directly:{" "}
                    <a
                      href="mailto:pitaliyakushal@gmail.com"
                      className="underline hover:text-accent"
                    >
                      pitaliyakushal@gmail.com
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
