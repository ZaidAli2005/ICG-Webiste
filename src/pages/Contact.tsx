import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Facebook, CheckCircle2, Clock, Send } from "lucide-react";
import { SITE } from "@/data/site";
import { PageHero } from "@/components/layout/PageHero";
import { ImgMark } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

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
      setError("Please enter a valid email address.");
      return;
    }

    // No backend endpoint exists yet — hand off to the visitor's mail client.
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${SITE.emails[1].address}?subject=${encodeURIComponent(
      form.subject ? `[Enquiry] ${form.subject}` : "[Enquiry] Website contact form",
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-brand-900/12 bg-paper px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/60 focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-600/20";

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact"
        title="Talk to the college office."
        lede="For admissions, prospectus availability and general enquiries, the college office is the fastest route to an answer."
      />

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Details */}
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Reach us" title="Addresses and numbers." />

            <Reveal delay={120}>
              <div className="mt-10 space-y-4">
                <div className="card p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <MapPin className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">Campus address</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                    {SITE.address.line1}
                    <br />
                    {SITE.address.line2}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapsQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700 transition-colors hover:text-brand-900"
                  >
                    Open in Google Maps
                  </a>
                </div>

                <div className="card p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">Telephone</h3>
                  <ul className="mt-4 space-y-3">
                    {SITE.phones.map((p) => (
                      <li key={p.number} className="flex items-baseline justify-between gap-4">
                        <span className="text-[13px] text-ink-muted">{p.label}</span>
                        <a
                          href={p.href}
                          className="text-[14px] font-semibold text-ink transition-colors hover:text-brand-700"
                        >
                          {p.number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Mail className="h-4.5 w-4.5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">Email</h3>
                  <ul className="mt-4 space-y-3">
                    {SITE.emails.map((e) => (
                      <li key={e.address} className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-[13px] text-ink-muted">{e.label}</span>
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

                <a
                  href={SITE.socials[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="card card-hover flex items-center gap-4 p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877F2] text-white">
                    <Facebook className="h-4.5 w-4.5" />
                  </span>
                  <span>
                    <span className="block font-display text-base font-semibold text-ink">
                      Facebook page
                    </span>
                    <span className="block text-[13px] text-ink-muted">
                      Announcements and college updates
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <div className="card overflow-hidden">
                <div className="border-b border-brand-900/10 bg-brand-900 px-8 py-6">
                  <h2 className="font-display text-xl font-semibold text-white">Send an enquiry</h2>
                  <p className="mt-1 flex items-center gap-2 text-[13px] text-brand-100/70">
                    <Clock className="h-3.5 w-3.5" />
                    The college office responds during working hours.
                  </p>
                </div>

                {sent ? (
                  <div className="px-8 py-16 text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                      Your email client is opening
                    </h3>
                    <p className="mx-auto mt-2.5 max-w-sm text-[14px] leading-relaxed text-ink-muted">
                      If nothing happened, write directly to{" "}
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
                        setForm({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="btn-outline btn-sm mt-7"
                    >
                      Write another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="space-y-5 px-8 py-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                          Your name
                        </span>
                        <input
                          type="text"
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Full name"
                          className={field}
                        />
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                          Email address
                        </span>
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
                      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                        Subject
                      </span>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={update("subject")}
                        placeholder="Admission, prospectus, department…"
                        className={field}
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                        Message
                      </span>
                      <textarea
                        value={form.message}
                        onChange={update("message")}
                        rows={6}
                        placeholder="How can we help?"
                        className={cn(field, "resize-y")}
                      />
                    </label>

                    {error && (
                      <p role="alert" className="text-[13px] font-medium text-destructive">
                        {error}
                      </p>
                    )}

                    <button type="submit" className="btn-primary w-full sm:w-auto">
                      <Send className="h-4 w-4" />
                      Send enquiry
                    </button>

                    <p className="text-[12px] leading-relaxed text-ink-muted/80">
                      This form opens your own email application — nothing is stored on this website.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map strip */}
      <section className="border-t border-brand-900/10 bg-brand-950">
        <div className="container-page flex flex-col items-center gap-8 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <Reveal className="flex items-center gap-5">
            <ImgMark src={SITE.media.logoMark} alt="College emblem" className="h-16 w-16" />
            <div>
              <p className="font-display text-lg font-semibold text-white">{SITE.nameFull}</p>
              <p className="mt-1 text-[13px] text-brand-100/65">
                {SITE.address.line1}, {SITE.address.line2}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.mapsQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-gold btn-sm shrink-0"
            >
              <MapPin className="h-4 w-4" />
              Get directions
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}