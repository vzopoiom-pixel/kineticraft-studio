import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Clock, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { sound } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    sound.playSuccess();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-white inline-block"></span>
          <h2 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight">
            Direct Dispatch & Contract Inquiries
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 font-code mt-1">
          Connect directly with Ivan Huban for frontend tasks, performance tuning, or Upwork milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Card & Credentials (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 bg-[#0a0a0a] border border-neutral-800 rounded-none space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-none bg-white text-black flex items-center justify-center font-code font-bold text-base border border-white">
                IH
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                  Ivan Huban
                </h3>
                <p className="text-xs text-neutral-400 font-code">
                  Creative UI & Frontend Engineer
                </p>
              </div>
            </div>

            <div className="pt-2 space-y-3 text-xs font-code text-neutral-300">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">RESPONSE TIME:</span>
                <strong className="text-white">WITHIN 1 HOUR</strong>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">ESCROW STATUS:</span>
                <strong className="text-white">UPWORK VERIFIED</strong>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">TIMEZONE:</span>
                <strong className="text-white">UTC+2 (EET / SOFIA)</strong>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                <span className="text-neutral-500">DIRECT EMAIL:</span>
                <strong className="text-white select-all">ivanjkdaolw@gmail.com</strong>
              </div>
            </div>

            <div className="p-3 bg-black border border-neutral-800 text-xs font-code text-neutral-400 leading-relaxed">
              Available for quick fixes ($25–$100) or structured sprint contracts with guaranteed turnaround.
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0a0a0a] border border-neutral-800 rounded-none">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-white text-black mx-auto flex items-center justify-center font-code font-bold">
                ✓
              </div>
              <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider">
                Dispatch Transmitted
              </h3>
              <p className="text-xs font-code text-neutral-400 max-w-sm mx-auto">
                Thank you! I will review your requirements and respond via email or Upwork.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xs font-code font-bold text-neutral-400 uppercase tracking-widest mb-3">
                Send Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-code font-semibold text-neutral-400 block mb-1 uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-3.5 py-2.5 rounded-none bg-black border border-neutral-800 text-xs font-code text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-code font-semibold text-neutral-400 block mb-1 uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-none bg-black border border-neutral-800 text-xs font-code text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-code font-semibold text-neutral-400 block mb-1 uppercase">
                  Project Scope / Issue Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your bug, paste your Upwork job link, or list desired features..."
                  className="w-full px-3.5 py-2.5 rounded-none bg-black border border-neutral-800 text-xs font-code text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-none bg-white hover:bg-neutral-200 text-black font-code font-bold text-xs uppercase tracking-wider transition-all border border-white active:scale-95"
              >
                Transmit Project Inquiry
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
