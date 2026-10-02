import { useState, type FormEvent } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  CheckCircle2,
  Clock,
  Send,
  Navigation,
  ExternalLink,
  MessageSquare,
  Info,
} from "lucide-react";
import { SITE, OFFICE_HOURS, ENQUIRY_TYPES } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { ImgMark } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAPS_SEARCH =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    SITE.address.mapsQuery,
  )}`;

/**
 * Keyless embed. This is the documented iframe endpoint Google Maps serves for
 * a plain place search; it needs no API key and no billing account. Swap it for
 * a Maps Embed API URL if you later want a styled or interactive map.
 */
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(
  SITE.address.mapsQuery,
)}&z=16&output=embed`;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: ENQUIRY_TYPES[0].value,
    message: "",
  });

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (error) setError("");
  };

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      setError("Please add your name and a message.");
      return;
    }
    if (!EMAIL_RE.test(form.email)) {
      setError("Please enter a valid email address so we can reply.");
      return;
    }

    // No backend endpoint exists yet — hand off to the visitor's mail client.
    const topic = ENQUIRY_TYPES.find((t) => t.value === form.topic)?.label ?? "General";
    const body = `${form.message}\n\n— ${form.name}\nEmail: ${form.email}${
      form.phone ? `\nPhone: ${form.phone}` : ""
    }`;

    window.location.href = `mailto:${SITE.emails[1].address}?subject=${encodeURIComponent(
      `[${topic}] Website enquiry`,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-brand-900/12 bg-paper px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/60 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-600/20";

  const label = "mb-2 block text-[11.5px] font-semibold uppercase tracking-[0.11em] text-ink-muted";

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact"
        title="Talk to the college office."
        lede="For admissions, prospectus availability and general enquiries, the college office is the fastest route to an answer."
      />

      {/* Quick routes */}
      <section className="border-b border-brand-900/10 bg-white">
        <div className="container-page grid gap-px overflow-hidden py-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "College office", value: SITE.phones[0].number, href: SITE.phones[0].href },
            { label: "Principal's office", value: SITE.phones[1].number, href: SITE.phones[1].href },
            { label: "General email", value: SITE.emails[1].address, href: `mailto:${SITE.emails[1].address}` },
            { label: "Prospectus & admissions", value: SITE.phones[0].number, href: SITE.phones[0].href },
          ].map((q, i) => (
            <Reveal key={q.label} delay={i * 55}>
              <a
                href={q.href}
                className="group flex h-full flex-col justify-center border-brand-900/10 px-1 py-6 transition-colors sm:px-4 lg:border-r lg:last:border-r-0 lg:px-6"
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                  {q.label}
                </span>
                <span className="mt-1.5 break-all font-display text-[15px] font-semibold text-brand-800 transition-colors group-hover:text-brand-600">
                  {q.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Details + form */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: contact details */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Reach us" title="Where to find us." />

            {/* Address */}
            <Reveal delay={100}>
              <div className="card mt-9 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">Campus address</h3>
                <address className="mt-1.5 text-[14px] not-italic leading-relaxed text-ink-muted">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}
                </address>
                <a
                  href={MAPS_SEARCH}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 transition-colors hover:text-brand-900"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </div>
            </Reveal>

            {/* Phones */}
            <Reveal delay={140}>
              <div className="card mt-4 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Phone className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink">Telephone</h3>
                <ul className="mt-4 divide-y divide-brand-900/8">
                  {SITE.phones.map((p) => (
                    <li key={p.number} className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0">
                      <span className="text-[13px] text-ink-muted">{p.label}</span>
                      <a
                        href={p.href}
                        className="whitespace-nowrap text-[14px] font-semibold text-ink transition-colors hover:text-brand-700"
                      >
                        {p.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Email + hours */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal delay={180}>
                <div className="card h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Mail className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">Email</h3>
                  <ul className="mt-4 space-y-2.5">
                    {SITE.emails.map((e) => (
                      <li key={e.address}>
                        <span className="block text-[11.5px] text-ink-muted">{e.label}</span>
                        <a
                          href={`mailto:${e.address}`}
                          className="break-all text-[14px] font-semibold text-ink transition-colors hover:text-brand-700"
                        >
                          {e.address}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="card h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Clock className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">Office hours</h3>
                  <ul className="mt-4 space-y-2.5">
                    {OFFICE_HOURS.map((h) => (
                      <li key={h.day} className="flex items-baseline justify-between gap-3">
                        <span className="text-[12.5px] text-ink-muted">{h.day}</span>
                        <span
                          className={cn(
                            "whitespace-nowrap text-[13px] font-semibold",
                            h.time === "Closed" ? "text-ink-muted/70" : "text-ink",
                          )}
                        >
                          {h.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Social */}
            <Reveal delay={260}>
              <a
                href={SITE.socials[0].href}
                target="_blank"
                rel="noreferrer"
                className="card card-hover mt-4 flex items-center gap-4 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                  <Facebook className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-base font-semibold text-ink">
                    Facebook page
                  </span>
                  <span className="block text-[13px] text-ink-muted">
                    Announcements and college updates
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-ink-muted" />
              </a>
            </Reveal>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="card overflow-hidden">
                <div className="relative overflow-hidden bg-brand-900 px-7 py-6 sm:px-9">
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[size:44px_44px] opacity-[.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    }}
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                      <MessageSquare className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-white">Send an enquiry</h2>
                      <p className="mt-1 text-[13px] text-brand-100/70">
                        Choose a topic so your message reaches the right desk.
                      </p>
                    </div>
                  </div>
                </div>

                {sent ? (
                  <div className="px-7 py-16 text-center sm:px-9">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                      Your email client is opening
                    </h3>
                    <p className="mx-auto mt-2.5 max-w-sm text-[14px] leading-relaxed text-ink-muted">
                      Your enquiry has been prepared with the topic filled in. If nothing happened,
                      write directly to{" "}
                      <a
                        href={`mailto:${SITE.emails[1].address}`}
                        className="font-semibold text-brand-700 hover:underline"
                      >
                        {SITE.emails[1].address}
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", email: "", phone: "", topic: ENQUIRY_TYPES[0].value, message: "" });
                      }}
                      className="btn-outline btn-sm mt-7"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-5 px-7 py-8 sm:px-9">
                    {/* Topic pills */}
                    <fieldset>
                      <legend className={label}>What is this about?</legend>
                      <div className="flex flex-wrap gap-2">
                        {ENQUIRY_TYPES.map((t) => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => update("topic")({ target: { value: t.value } })}
                            aria-pressed={form.topic === t.value}
                            className={cn(
                              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-all duration-200",
                              form.topic === t.value
                                ? "border-brand-700 bg-brand-700 text-white"
                                : "border-brand-900/12 bg-paper text-ink-soft hover:border-brand-600/40 hover:text-brand-700",
                            )}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className={label}>Your name</span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Full name"
                          className={field}
                        />
                      </label>

                      <label className="block">
                        <span className={label}>Email address</span>
                        <input
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="you@example.com"
                          className={field}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className={label}>
                        Phone <span className="font-normal normal-case tracking-normal text-ink-muted/70">(optional)</span>
                      </span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        placeholder="03XX XXXXXXX"
                        className={field}
                      />
                    </label>

                    <label className="block">
                      <span className={label}>Message</span>
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        rows={6}
                        placeholder="How can we help?"
                        className={cn(field, "resize-y")}
                      />
                    </label>

                    {error && (
                      <p
                        role="alert"
                        className="flex items-center gap-2 rounded-xl bg-destructive/8 px-4 py-3 text-[13px] font-medium text-destructive"
                      >
                        <Info className="h-4 w-4 shrink-0" />
                        {error}
                      </p>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button type="submit" className="btn-primary w-full sm:w-auto">
                        <Send className="h-4 w-4" />
                        Send enquiry
                      </button>
                      <p className="text-[12px] leading-relaxed text-ink-muted/80">
                        Opens your own email app — nothing is stored on this website.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-brand-900/10 bg-white">
        <div className="container-page py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Location"
              title="Islamia College Road, Gujranwala."
              className="max-w-xl"
            />
            <Reveal>
              <a
                href={MAPS_SEARCH}
                target="_blank"
                rel="noreferrer"
                className="btn-outline btn-sm shrink-0"
              >
                Open in Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative mt-9 overflow-hidden rounded-2xl border border-brand-900/10 bg-brand-50">
              <iframe
                title={`Map showing ${SITE.name}`}
                src={MAPS_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing strip */}
      <section className="bg-brand-950">
        <div className="container-page flex flex-col items-center gap-6 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <Reveal className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-5 sm:text-left">
            <ImgMark src={SITE.media.logoMark} alt="College emblem" className="h-16 w-16" />
            <div>
              <p className="font-display text-lg font-semibold text-white">{SITE.nameFull}</p>
              <p className="mt-1 text-[13px] text-brand-100/65">
                {SITE.address.line1}, {SITE.address.line2}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <a href={MAPS_SEARCH} target="_blank" rel="noreferrer" className="btn-gold btn-sm shrink-0">
              <MapPin className="h-4 w-4" />
              Get directions
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
