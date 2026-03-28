import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, PlusCircle, Info } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CreditCard as CardType } from "../types";
import { getBestCard } from "../utils/cardLogic";
import { CreditCard } from "../components/CreditCard";

export function Home() {
  const [cards] = useLocalStorage<CardType[]>("credit-cards", []);
  const recommendation = getBestCard(cards);

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 max-w-2xl mx-auto">
        <div className="w-24 h-24 rounded-3xl brand-gradient flex items-center justify-center text-white shadow-2xl shadow-brand-primary/40 mb-4 animate-bounce">
          <PlusCircle size={48} />
        </div>
        <h1 className="text-5xl font-display font-bold text-white tracking-tight text-gradient">
          Start Managing Your Credit Today
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          Add your credit cards to find out which one gives you the maximum 
          time for repayment at any given moment.
        </p>
        <Link
          to="/manage"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl brand-gradient text-white font-bold text-lg shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          Add Credit Card
          <ArrowUpRight size={20} />
        </Link>
        <Link 
          to="/about"
          className="text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2"
        >
          <Info size={16} />
          About the Creator
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-4">
      {/* Recommendation Hero */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass rounded-[3rem] p-8 md:p-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
                <Clock size={14} />
                Recommended for Today
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Use your <span className="text-brand-primary">{recommendation?.bestCard.title}</span> today
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-slate-400">
                  You'll get up to <span className="text-white font-bold text-2xl px-2">{recommendation?.daysToRepay}</span> days to repay this purchase.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Next Statement</p>
                    <p className="text-white font-semibold">{recommendation?.statementDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Payment Due</p>
                    <p className="text-brand-secondary font-semibold">{recommendation?.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {recommendation && (
                <div className="w-full max-w-sm transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <CreditCard card={recommendation.bestCard} isBest />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Cards Grid */}
      {cards.length > 1 && (
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-white">Compare All Cards</h2>
            <Link to="/manage" className="text-brand-primary font-medium hover:underline text-sm">
              Manage Cards
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <CreditCard
                key={card.id}
                card={card}
                isBest={card.id === recommendation?.bestCard.id}
              />
            ))}
          </div>
        </section>
      )}
      <div className="flex justify-center pt-8">
        <Link 
          to="/about"
          className="text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group p-4"
        >
          <Info size={16} className="group-hover:rotate-12 transition-transform" />
          About the Creator
        </Link>
      </div>
    </div>
  );
}
