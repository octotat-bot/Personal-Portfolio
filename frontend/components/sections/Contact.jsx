import { useState } from 'react';
import { contactInfo } from '../../data/content';
import { Reveal, ArrowUpRight } from '../ui/editorial';
import { ScrollWords, DriftBlobs } from '../ui/motion';

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
      <label htmlFor={id} className="block mb-1.5 text-[14px] font-medium text-ink">{label}</label>
      <Tag
        id={id}
        name={id}
        className={`field-ed ${as === 'textarea' ? 'resize-none' : ''}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-danger">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const [copied, setCopied] = useState(false);

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
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-32">
      <div className="container-ed grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Reveal className="lg:col-span-7 relative overflow-hidden rounded-[28px] bg-accent text-white p-8 md:p-12 shadow-lg flex flex-col justify-between min-h-[520px]">
          <DriftBlobs colors={['rgba(255,255,255,0.28)', 'rgba(120,160,255,0.45)']} />
          <div aria-hidden className="absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-white/15" />
          <div aria-hidden className="absolute -right-8 -top-8 w-[260px] h-[260px] rounded-full border border-white/15" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 h-[30px] px-3 rounded-full bg-white/15 font-mono text-[11px] font-medium uppercase tracking-[0.06em]">
              <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-[#7CF2A8]" />{contactInfo.availability}
            </span>
            {/* Words land from large to size as the card scrolls in. */}
            <ScrollWords
              id="contact-title"
              mode="land"
              parts={[{ text: 'Let’s talk.' }]}
              className="mt-8 font-display font-semibold text-[64px] md:text-[112px] leading-[0.88] tracking-[-0.05em]"
            />
          </div>

          <div className="relative mt-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75 mb-3">Email · fastest reply</div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${contactInfo.email}`} className="font-display font-medium text-[22px] sm:text-[32px] tracking-[-0.02em] underline decoration-white/35 underline-offset-[6px] hover:decoration-white break-all">
                {contactInfo.email}
              </a>
              <button type="button" onClick={copyEmail} className="btn-ed !bg-white !border-white !text-accent !min-h-[40px]">
                {copied ? 'Copied' : 'Copy'}
              </button>
              <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {[...Object.entries(contactInfo.social), ['resume', '/resume.pdf']].map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/10 border border-white/25 text-[15px] font-medium hover:bg-white hover:text-accent transition-colors"
                  >
                    {SOCIAL_LABELS[platform] ?? 'Resume'} <ArrowUpRight />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5 card p-7 md:p-9">
          <h3 className="font-display font-semibold text-[26px] tracking-[-0.03em] text-ink">Or send a message</h3>
          <p className="mt-1 text-[15px] text-ink-3">It lands in the same inbox.</p>
          <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-5 mt-7">
            <Field id="name" label="Name" autoComplete="name" value={form.name} onChange={update('name')} error={errors.name} />
            <Field id="email" label="Email" type="email" autoComplete="email" value={form.email} onChange={update('email')} error={errors.email} />
            <Field id="message" label="Message" as="textarea" rows={5} value={form.message} onChange={update('message')} error={errors.message} />

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button type="submit" className="btn-ed btn-ed-dark" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p role="status" aria-live="polite" className="text-[14px]">
                {status === 'sent' && <span className="text-ink">Sent. I'll reply by email.</span>}
                {status === 'failed' && (
                  <span className="text-danger">
                    Couldn't send. Email me at{' '}
                    <a href={`mailto:${contactInfo.email}`} className="underline underline-offset-4">{contactInfo.email}</a>.
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
