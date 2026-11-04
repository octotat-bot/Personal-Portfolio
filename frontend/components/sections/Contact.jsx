import { useState } from 'react';
import { contactInfo } from '../../data/content';
import { Reveal, ArrowUpRight } from '../ui/editorial';

// Web3Forms keys are public by design: they only allow sending to the
// inbox registered with the key.
const WEB3FORMS_KEY = '68e731ee-beab-45d7-9c57-50081bd8d3de';

const SOCIAL_LABELS = { github: 'GitHub', linkedin: 'LinkedIn', leetcode: 'LeetCode' };

function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter an email address I can reply to.';
  if (message.trim().length < 10) errors.message = 'Write a message of at least 10 characters.';
  return errors;
}

function Field({ id, label, error, as = 'input', ...props }) {
  const Tag = as;
  return (
    <div>
      <label htmlFor={id} className="eyebrow block mb-1">{label}</label>
      <Tag
        id={id}
        name={id}
        className={`field-ed ${as === 'textarea' ? 'resize-none' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[12px] text-danger">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...form }),
      });
      const result = await res.json();
      if (!result.success) throw new Error(result.message);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('failed');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the address is still visible and selectable.
    }
  };

  return (
    <section id="contact" data-shape="horizon" aria-labelledby="contact-title" className="relative min-h-[100svh] py-28 md:py-40">
      <div className="container-ed">
        <Reveal className="mb-16">
          <div className="eyebrow mb-6 flex items-center gap-4">04 — Contact <span className="w-14 h-px bg-rule-strong" aria-hidden /></div>
          <h2 id="contact-title" className="font-serif text-[72px] md:text-[128px] leading-[0.9] tracking-[-0.02em] text-ink">
            Let's <em className="text-ink-2">talk.</em>
          </h2>
          <p className="mt-6 text-[14px] text-ink-2">{contactInfo.availability}.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <Reveal className="lg:col-span-6">
            <div className="eyebrow mb-3">Email</div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-12">
              <a href={`mailto:${contactInfo.email}`} className="link-ed font-serif text-[26px] sm:text-4xl break-all">
                {contactInfo.email}
              </a>
              <button type="button" onClick={copyEmail} className="btn-ed">
                {copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </div>

            <ul className="border-t border-rule">
              {Object.entries(contactInfo.social).map(([platform, url]) => (
                <li key={platform} className="border-b border-rule">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between py-4 min-h-[44px] text-ink-2 hover:text-ink transition-colors"
                  >
                    <span className="font-serif text-2xl">{SOCIAL_LABELS[platform] ?? platform}</span>
                    <span className="flex items-center gap-2 text-[12px] text-ink-3 group-hover:text-ink transition-colors">
                      {url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                      <ArrowUpRight />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li className="border-b border-rule">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between py-4 min-h-[44px] text-ink-2 hover:text-ink transition-colors"
                >
                  <span className="font-serif text-2xl">Resume</span>
                  <span className="flex items-center gap-2 text-[12px] text-ink-3 group-hover:text-ink transition-colors">
                    PDF <ArrowUpRight />
                  </span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <button
              type="button"
              aria-expanded={formOpen}
              aria-controls="contact-form"
              onClick={() => setFormOpen((o) => !o)}
              className="btn-ed w-full justify-between"
            >
              Or write a message here <span aria-hidden>{formOpen ? '−' : '+'}</span>
            </button>
            <form id="contact-form" hidden={!formOpen} onSubmit={handleSubmit} noValidate className="space-y-8 mt-8">
              <Field id="name" label="Name" autoComplete="name" value={form.name} onChange={update('name')} error={errors.name} />
              <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={update('email')} error={errors.email} />
              <Field id="message" label="Message" as="textarea" rows={5} value={form.message} onChange={update('message')} error={errors.message} />

              <div className="flex flex-wrap items-center gap-6">
                <button type="submit" className="btn-ed btn-ed-solid" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <p role="status" aria-live="polite" className="text-[13px]">
                  {status === 'sent' && <span className="text-ink">Sent. I'll reply by email.</span>}
                  {status === 'failed' && (
                    <span className="text-danger">
                      Couldn't send. Email me directly at{' '}
                      <a href={`mailto:${contactInfo.email}`} className="underline underline-offset-4">{contactInfo.email}</a>.
                    </span>
                  )}
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
