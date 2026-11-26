"use client";
import React, { useState } from "react";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { BUSINESS_SETTINGS } from "@/data/storeData";
import { useStore } from "@/context/StoreContext";
import { whatsappLink } from "@/components/SiteShell";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const input = "w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-primary-600";

export default function ContactPage() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-10 space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-primary-600">Get In Touch</span>
        <h1 className="font-display font-extrabold text-2xl text-slate-900">Contact BestPrices.lk</h1>
        <p className="text-xs sm:text-sm text-slate-600">Have a question about bulk appliance orders, corporate inquiries, or delivery? Send us a message.</p>
        <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
          <a href="tel:+94112345678" className="flex items-center gap-2.5 hover:text-primary-600">
            <PhoneCall className="w-4 h-4 text-primary-600" /> <strong>Hotline:</strong> {BUSINESS_SETTINGS.hotline}
          </a>
          <a href={`mailto:${BUSINESS_SETTINGS.supportEmail}`} className="flex items-center gap-2.5 hover:text-primary-600">
            <Mail className="w-4 h-4 text-primary-600" /> <strong>Email:</strong> {BUSINESS_SETTINGS.supportEmail}
          </a>
          <a href={BUSINESS_SETTINGS.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-primary-600">
            <MapPin className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
            <span>
              <strong>Location:</strong> {BUSINESS_SETTINGS.headOffice}
            </span>
          </a>
          <a
            href={BUSINESS_SETTINGS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-gradient-to-r from-primary-50 to-white p-4 hover:border-primary-400 hover:shadow-md transition group"
          >
            <span className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-bold text-ink">Find us on Google Maps</span>
                <span className="block text-xs text-slate-500">Open directions to our store</span>
              </span>
            </span>
            <span className="text-primary-600 font-bold text-sm group-hover:translate-x-1 transition-transform">Directions →</span>
          </a>
          <a
            href={whatsappLink("Hello BestPrices.lk! I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-xs px-4 py-2.5 rounded-xl"
          >
            <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          showToast("Enquiry submitted! Our team will respond shortly.");
          setForm({ name: "", email: "", message: "" });
        }}
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4"
      >
        <h2 className="font-display font-bold text-lg text-slate-900">Send an Enquiry</h2>
        <input type="text" required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} />
        <input type="email" required placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} />
        <textarea
          rows={4}
          required
          placeholder="How can we help you?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={input}
        />
        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl text-sm">
          Send Message
        </button>
      </form>
    </div>

    {/* Embedded Google Map */}
    <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden" aria-label="Store location map">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6 border-b border-slate-100">
        <div>
          <h2 className="font-display font-bold text-lg text-slate-900">Visit Our Store</h2>
          <p className="text-xs sm:text-sm text-slate-500">{BUSINESS_SETTINGS.headOffice}</p>
        </div>
        <a
          href={BUSINESS_SETTINGS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold px-5 py-2.5 rounded-full transition"
        >
          <MapPin className="w-4 h-4" /> Get Directions
        </a>
      </div>
      <iframe
        title="BestPrices.lk location on Google Maps"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(BUSINESS_SETTINGS.mapsEmbedQuery)}&z=16&output=embed`}
        className="w-full h-[320px] sm:h-[420px] border-0 block"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </section>
    </div>
  );
}