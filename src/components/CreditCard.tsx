import type { CreditCard as CardType } from "../types";
import { CreditCard as CardIcon, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CreditCardProps {
  card: CardType;
  isBest?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
}

export function CreditCard({ card, isBest, onClick, actions }: CreditCardProps) {
  const getGradient = (id: string) => {
    const gradients = [
      "from-indigo-600 to-violet-700",
      "from-emerald-600 to-teal-700",
      "from-rose-600 to-pink-700",
      "from-amber-600 to-orange-700",
      "from-sky-600 to-blue-700",
    ];
    // Simple hash from ID
    const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      className={`relative group overflow-hidden rounded-[2rem] p-8 border border-white/10 shadow-xl transition-all duration-300 ${
        isBest ? "ring-2 ring-brand-primary ring-offset-4 ring-offset-surface-900" : ""
      }`}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(card.id)} opacity-20 group-hover:opacity-30 transition-opacity`} />
      
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-8">
          <div className="w-12 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
            <CardIcon className="text-white/80" size={24} />
          </div>
          {isBest && (
            <span className="px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
              Best to Use
            </span>
          )}
        </div>

        <h3 className="text-2xl font-display font-bold text-white mb-6 group-hover:text-gradient transition-all">
          {card.title}
        </h3>

        <div className="mt-auto space-y-4">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Generation</p>
              <div className="flex items-center gap-1.5 text-white/90">
                <Calendar size={14} className="text-brand-primary" />
                <span className="font-semibold">{card.billGenerationDate}th</span>
              </div>
            </div>
            
            <ArrowRight size={14} className="text-slate-600" />

            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Payment</p>
              <div className="flex items-center gap-1.5 text-white/90">
                <Calendar size={14} className="text-brand-secondary" />
                <span className="font-semibold">{card.billPaymentDate}th</span>
              </div>
            </div>
          </div>

          {actions && (
            <div className="pt-4 border-t border-white/5 flex gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
