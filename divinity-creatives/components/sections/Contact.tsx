"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import { MaskLines } from "@/components/ui/Reveal";
import WingMark from "@/components/brand/WingMark";

const EASE = [0.16, 1, 0.3, 1] as const;

type Form = {
  name: string;
  email: string;
  company: string;
  link: string;
  contentType: string[];
  goal: string;
  volume: string;
  budget: string;
  notes: string;
};

const EMPTY: Form = {
  name: "",
  email: "",
  company: "",
  link: "",
  contentType: [],
  goal: "",
  volume: "",
  budget: "",
  notes: "",
};

const CONTENT_TYPES = [
  "YouTube longform",
  "Short form",
  "Motion design",
  "Thumbnails & packaging",
  "Brand film",
  "Content system",
];
const VOLUMES = ["1–4 / month", "5–12 / month", "12–30 / month", "Daily", "One-off"];
const BUDGETS = ["Under $1k / mo", "$1k–3k / mo", "$3k–7k / mo", "$7k+ / mo", "Project fee"];

const STEPS = [
  { n: "01", label: "You" },
  { n: "02", label: "The work" },
  { n: "03", label: "The fit" },
];

function Field({
  label,
  value,
  onChange,
  type = "text",
  error,
  hint,
  multiline,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  required?: boolean;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative pt-6">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          floated
            ? "top-0 text-[13px] text-muted"
            : "top-[1.9rem] text-[17px] text-fg/55"
        }`}
      >
        {label}
        {required && <span className="text-glow"> *</span>}
      </label>
      <Tag
        id={id}
        type={multiline ? undefined : type}
        value={value}
        rows={multiline ? 3 : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error || hint ? `${id}-msg` : undefined}
        className="w-full resize-none border-0 border-b border-line bg-transparent pb-2 pt-1 text-[17px] text-fg outline-none transition-colors duration-500 placeholder:text-dim focus:border-transparent"
      />
      <span
        aria-hidden
        className={`absolute bottom-0 left-0 block h-px w-full origin-left bg-glow transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          focused ? "scale-x-100" : "scale-x-0"
        }`}
        style={{ boxShadow: focused ? "0 0 12px 1px rgba(201,167,255,0.45)" : "none" }}
      />
      <AnimatePresence>
        {(error || hint) && (
          <motion.p
            id={`${id}-msg`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-2 text-[13px] ${error ? "text-warm" : "text-dim"}`}
          >
            {error ?? hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chips({
  options,
  value,
  onSelect,
  multi,
  label,
}: {
  options: string[];
  value: string | string[];
  onSelect: (v: string) => void;
  multi?: boolean;
  label: string;
}) {
  const selected = (o: string) =>
    multi ? (value as string[]).includes(o) : value === o;
  return (
    <fieldset className="pt-6">
      <legend className="text-[13px] text-muted">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={selected(o)}
            onClick={() => onSelect(o)}
            className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-400 ${
              selected(o)
                ? "border-glow/60 bg-glow/10 text-fg"
                : "border-line text-muted hover:border-line-strong hover:text-fg"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validateStep = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = "We need something to call you.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
        e.email = "That address looks incomplete — check the domain.";
    }
    if (step === 1) {
      if (!form.contentType.length)
        e.contentType = "Pick at least one — you can change your mind later.";
      if (form.goal.trim().length < 12)
        e.goal = "A sentence or two is plenty. What are you trying to make?";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => validateStep() && setStep((s) => s + 1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setSending(true);
    // TODO(backend): POST `form` to the inquiry endpoint / email service.
    // Everything needed to qualify the lead is in this single object.
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-line py-24 lg:py-36"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-y-12 px-5 sm:px-8 lg:gap-x-10">
        <div className="col-span-12 lg:col-span-4">
          <MaskLines
            as="h2"
            id="contact-heading"
            className="display text-[clamp(2.2rem,5vw,4rem)]"
            lines={["Tell us what", "you're making."]}
          />
          <p className="prose-lede mt-6">
            We take on a small number of channels at a time. This form is how we
            work out whether we are the right studio for yours — it takes about
            two minutes.
          </p>
          <div className="mt-10 space-y-3 border-t border-line pt-6 text-sm">
            <a
              href="mailto:hello@divinitycreatives.com"
              className="link-draw block text-fg"
            >
              hello@divinitycreatives.com
            </a>
            <p className="text-dim">Replies within one working day, US + UK hours.</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex min-h-[46vh] flex-col items-start justify-center border-t border-line pt-10"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <WingMark paired className="h-auto w-40 text-glow" strokeWidth={1.2} />
                </motion.div>
                <h3 className="display mt-8 text-[clamp(2rem,4vw,3.4rem)]">
                  That&rsquo;s with us.
                </h3>
                <p className="prose-lede mt-4">
                  We read every inquiry properly rather than sending an
                  auto-reply. Expect a real answer from a person within one
                  working day — and if we are not the right fit, we will tell you
                  who is.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY);
                    setStep(0);
                    setSent(false);
                  }}
                  className="link-draw mt-8 text-sm text-muted"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-line pt-8"
              >
                {/* step indicator */}
                <div className="flex items-center gap-6">
                  {STEPS.map((s, i) => (
                    <div key={s.n} className="flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                          i === step
                            ? "bg-glow"
                            : i < step
                              ? "bg-fg/50"
                              : "bg-line-strong"
                        }`}
                      />
                      <span
                        className={`text-sm transition-colors duration-500 ${
                          i === step ? "text-fg" : "text-dim"
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 min-h-[340px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="space-y-2"
                    >
                      {step === 0 && (
                        <>
                          <Field
                            label="Name"
                            required
                            value={form.name}
                            onChange={(v) => set("name", v)}
                            error={errors.name}
                          />
                          <Field
                            label="Email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(v) => set("email", v)}
                            error={errors.email}
                          />
                          <Field
                            label="Company or brand"
                            value={form.company}
                            onChange={(v) => set("company", v)}
                          />
                          <Field
                            label="Website or channel"
                            value={form.link}
                            onChange={(v) => set("link", v)}
                            hint="A link to your best recent video helps most."
                          />
                        </>
                      )}

                      {step === 1 && (
                        <>
                          <Chips
                            label="What kind of content?"
                            options={CONTENT_TYPES}
                            value={form.contentType}
                            multi
                            onSelect={(v) =>
                              set(
                                "contentType",
                                form.contentType.includes(v)
                                  ? form.contentType.filter((x) => x !== v)
                                  : [...form.contentType, v],
                              )
                            }
                          />
                          {errors.contentType && (
                            <p className="pt-2 text-[13px] text-warm">
                              {errors.contentType}
                            </p>
                          )}
                          <Field
                            label="What are you looking for?"
                            multiline
                            required
                            value={form.goal}
                            onChange={(v) => set("goal", v)}
                            error={errors.goal}
                          />
                          <Chips
                            label="Monthly volume"
                            options={VOLUMES}
                            value={form.volume}
                            onSelect={(v) => set("volume", v)}
                          />
                        </>
                      )}

                      {step === 2 && (
                        <>
                          <Chips
                            label="Budget range"
                            options={BUDGETS}
                            value={form.budget}
                            onSelect={(v) => set("budget", v)}
                          />
                          <Field
                            label="Anything else we should know?"
                            multiline
                            value={form.notes}
                            onChange={(v) => set("notes", v)}
                            hint="Deadlines, references, what has not worked before."
                          />
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`link-draw text-sm text-muted transition-opacity duration-300 ${
                      step === 0 ? "pointer-events-none opacity-0" : "opacity-100"
                    }`}
                  >
                    Back
                  </button>

                  {step < STEPS.length - 1 ? (
                    <MagneticButton onClick={next} className="px-6 py-3 text-sm">
                      Continue
                    </MagneticButton>
                  ) : (
                    <MagneticButton
                      type="submit"
                      disabled={sending}
                      className="px-6 py-3 text-sm"
                    >
                      {sending ? "Sending" : "Send inquiry"}
                    </MagneticButton>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
