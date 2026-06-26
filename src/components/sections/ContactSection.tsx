import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Mail, Github, Linkedin, Loader2 } from "lucide-react";
import { z } from "zod";
import { SectionHeader } from "@/components/visual/SectionHeader";
import { GlassCard } from "@/components/visual/GlassCard";
import { profile } from "@/data/profile";

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Valid email required").max(160),
  message: z.string().trim().min(10, "Please add a bit more detail").max(2000),
});

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactSection() {
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (field) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setState("submitting");
    // TODO: persist to Supabase contact_messages table once Cloud is enabled.
    await new Promise((r) => setTimeout(r, 800));
    setState("success");
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="Open to AI engineering roles, agentic AI collaborations, and research conversations."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="h-full p-7">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Reach out directly
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                The fastest channels — pick whichever fits your workflow.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={profile.social.email}
                  className="glass flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-white/10"
                >
                  <Mail className="h-4 w-4 text-electric" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </p>
                    <p className="text-sm font-medium">{profile.email}</p>
                  </div>
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4 text-electric" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      LinkedIn
                    </p>
                    <p className="text-sm font-medium">linkedin.com/in/nabhjain</p>
                  </div>
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-xl p-4 transition-colors hover:bg-white/10"
                >
                  <Github className="h-4 w-4 text-electric" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      GitHub
                    </p>
                    <p className="text-sm font-medium">@{profile.githubUsername}</p>
                  </div>
                </a>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard className="p-7">
              {state === "success" ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center">
                  <CheckCircle2 className="h-10 w-10 text-electric" />
                  <h3 className="font-display text-xl font-semibold">
                    Message sent
                  </h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out — I'll respond within a day or two.
                  </p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="mt-2 text-sm text-electric underline-offset-4 hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      error={errors.name}
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      error={errors.email}
                    />
                  </div>
                  <Field
                    as="textarea"
                    label="Message"
                    name="message"
                    placeholder="What would you like to build, discuss, or collaborate on?"
                    error={errors.message}
                  />
                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-electric to-purple px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow disabled:opacity-60"
                  >
                    {state === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  as = "input",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  as?: "input" | "textarea";
}) {
  const base =
    "glass w-full rounded-xl bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-electric/50";
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium text-muted-foreground"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={5}
          className={base}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={base}
        />
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
