"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { whatsappUrl } from "@/lib/whatsapp";

const interests = [...services.map((s) => s.title), "Recommended equipment", "Something else"];
const field = "mt-2 w-full rounded-sm border border-line bg-surface-soft px-4 py-3 text-cream placeholder:text-muted/70 focus:border-amber focus:outline-none";
const label = "text-xs font-medium uppercase tracking-[0.14em] text-cream/80";

type Errors = Partial<Record<"name" | "contact" | "message", string>>;

/**
 * No backend is required: a validated enquiry opens WhatsApp (primary) or the visitor's
 * email app with the details pre-filled. Nothing is stored or sent to a third party.
 */
export function EnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");

  function read(form: HTMLFormElement) {
    const d = new FormData(form);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    return { name: v("name"), email: v("email"), phone: v("phone"), service: v("service"), message: v("message") };
  }

  function validate(v: ReturnType<typeof read>): Errors {
    const e: Errors = {};
    if (v.name.length < 2) e.name = "Please enter your name.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email);
    const phoneOk = /^[+()\d\s-]{7,20}$/.test(v.phone);
    if (!emailOk && !phoneOk) e.contact = "Please give a valid email address or phone number so we can reply.";
    if (v.email && !emailOk) e.contact = "That email address does not look right.";
    if (v.phone && !phoneOk) e.contact = "That phone number does not look right.";
    if (v.message.length < 10) e.message = "Please tell us a little about what you need (at least 10 characters).";
    return e;
  }

  function body(v: ReturnType<typeof read>) {
    const lines = [`Hello Fresh Wind Music, my name is ${v.name}.`];
    if (v.service) lines.push(`I am interested in: ${v.service}.`);
    lines.push("", v.message, "");
    if (v.email) lines.push(`Email: ${v.email}`);
    if (v.phone) lines.push(`Phone: ${v.phone}`);
    return lines.join("\n").trim();
  }

  function submit(channel: "whatsapp" | "email") {
    return (e: React.MouseEvent<HTMLButtonElement>) => {
      const form = e.currentTarget.form!;
      const v = read(form);
      const errs = validate(v);
      setErrors(errs);
      if (Object.keys(errs).length) {
        setStatus("Please fix the highlighted fields.");
        form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
        return;
      }
      const text = body(v);
      if (channel === "whatsapp") window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
      else window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${v.service || "Fresh Wind Music"}`)}&body=${encodeURIComponent(text)}`;
      setStatus(channel === "whatsapp" ? "Opening WhatsApp with your enquiry…" : "Opening your email app with your enquiry…");
    };
  }

  const err = (id: string, msg?: string) => msg && <p id={`${id}-error`} className="mt-2 text-sm text-red-300">{msg}</p>;

  return (
    <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-6" aria-describedby="form-help">
      <p id="form-help" className="text-sm text-muted">Fields marked * are required. Your details are only used to open a message to us — nothing is stored on this website.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name *</label>
          <input id="name" name="name" autoComplete="name" maxLength={80} className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {err("name", errors.name)}
        </div>
        <div>
          <label htmlFor="service" className={label}>Service of interest</label>
          <select id="service" name="service" defaultValue="" className={field}>
            <option value="">Select a service</option>
            {interests.map((i) => (<option key={i} value={i}>{i}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={120} className={field} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-error" : undefined} />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={20} className={field} aria-invalid={!!errors.contact} aria-describedby={errors.contact ? "contact-error" : undefined} />
        </div>
      </div>
      {err("contact", errors.contact)}
      <div>
        <label htmlFor="message" className={label}>Project description *</label>
        <textarea id="message" name="message" rows={5} maxLength={1500} className={field} placeholder="Tell us about your project, music or the lessons you are interested in." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {err("message", errors.message)}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="button" size="lg" onClick={submit("whatsapp")}><MessageCircle aria-hidden="true" /> Send via WhatsApp</Button>
        <Button type="button" size="lg" variant="outline" onClick={submit("email")}><Mail aria-hidden="true" /> Send by email</Button>
      </div>
      <p role="status" aria-live="polite" className="min-h-5 text-sm text-amber">{status}</p>
    </form>
  );
}
