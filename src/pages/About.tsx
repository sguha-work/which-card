import { Mail, Info, ArrowLeft, Heart, Coffee } from "lucide-react";
import googlePayQR from "../assets/GooglePay_QR.jpg";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-4">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
            <Info size={14} />
            About the Project
        </div>
        <h1 className="text-5xl font-display font-bold text-white tracking-tight text-gradient">
          WhichCard
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          A simple yet powerful tool designed to help you maximize your interest-free 
          repayment period by choosing the right credit card for every purchase.
        </p>
      </header>

      <section className="glass rounded-[3rem] p-8 md:p-12 space-y-8 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">The Purpose</h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Credit cards often have different billing cycles. By strategically choosing a card whose 
            statement has just been generated, you can get up to 45-55 days of interest-free credit. 
            WhichCard automates this calculation, so you don't have to remember dates or do the math 
            yourself.
          </p>
          <div className="pt-4 border-t border-white/5 space-y-4">
            <h3 className="text-lg font-display font-semibold text-white">Features:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Smart Recommendation Engine",
                "Billing Cycle Management",
                "Interest-free Period Maximization",
                "Local-only Data Storage"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
      </section>

      <section className="text-center space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-bold text-white">Meet the Creator</h2>
          <p className="text-slate-400">Crafted with passion and precision.</p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full brand-gradient p-1">
              <div className="w-full h-full rounded-full bg-surface-900 flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-bold text-white">SG</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-surface-800 border-2 border-surface-900 flex items-center justify-center text-red-500 shadow-lg">
              <Heart size={14} fill="currentColor" />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-display font-bold text-white">Sahasrangshu Guha</h3>
            <p className="text-brand-primary font-medium">Software Engineer & Enthusiast</p>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/sguha-work" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-all group"
            >
              GitHub
            </a>
            <a 
              href="mailto:sguha1988.life@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-all group"
            >
              <Mail size={20} className="group-hover:text-white" />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Buy Me a Coffee Section */}
      <section className="glass rounded-[3rem] p-8 md:p-12 space-y-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-orange-500/5 rounded-[3rem]" />
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-widest">
            <Coffee size={14} />
            Support the Project
          </div>
          <h2 className="text-2xl font-display font-bold text-white">Buy Me a Coffee ☕</h2>
          <p className="text-slate-400 leading-relaxed max-w-md mx-auto">
            If you find WhichCard useful and want to support my work, consider buying me a cup of hot filter coffee!
            Scan the QR code or click the link below to pay via UPI.
          </p>

          <a
            href="upi://pay?pa=sguha1988.life@okicici&pn=sahasrangshuguha&am=15&cu=INR"
            className="inline-block"
          >
            <div className="relative mx-auto w-fit group">
              <div className="absolute -inset-1 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-3xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="relative bg-white rounded-2xl p-3 shadow-2xl">
                <img
                  src={googlePayQR}
                  alt="Google Pay QR Code – UPI ID: sguha1988.life@okicici"
                  className="w-52 h-52 object-contain rounded-xl"
                />
              </div>
            </div>
          </a>

          <div className="space-y-3">
            <p className="text-slate-500 text-sm">UPI ID: <span className="text-slate-300 font-mono font-medium">sguha1988.life@okicici</span></p>
            <a
              href="upi://pay?pa=sguha1988.life@okicici&pn=sahasrangshu%20guha&am=15&cu=INR"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-300 font-semibold hover:from-yellow-500/30 hover:to-orange-500/30 hover:border-yellow-400/50 hover:text-yellow-200 transition-all duration-200 text-sm"
            >
              <Coffee size={16} />
              Pay ₹15 via UPI
            </a>
          </div>
        </div>
      </section>

      <div className="pt-8 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Tool
        </Link>
      </div>
    </div>
  );
}
