import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, PlusCircle, Info, AlertCircle } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { CreditCard as CardType } from "../types";
import { getBestCard, getCardRecommendation, getUpcomingPayments } from "../utils/cardLogic";
import { CreditCard } from "../components/CreditCard";

export function Home() {
  const [cards] = useLocalStorage<CardType[]>("credit-cards", []);
  const recommendation = getBestCard(cards);
  const upcomingPayments = getUpcomingPayments(cards);

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
          Add your credit cards (only title and dates required) to find out which one gives you the maximum 
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
    <div className="space-y-12 py-4">
      {/* Upcoming Payments Alert */}
      {upcomingPayments.length > 0 && (
        <section className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative group overflow-hidden rounded-3xl p-1 bg-gradient-to-r from-emergency/50 to-rose-500/50 shadow-2xl shadow-emergency/20">
            <div className="relative glass rounded-[1.4rem] px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl emergency-gradient flex items-center justify-center text-white shadow-lg shadow-emergency/30 shrink-0">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white">Upcoming Bill Payments</h3>
                  <p className="text-sm text-slate-400">You have {upcomingPayments.length} {upcomingPayments.length === 1 ? 'bill' : 'bills'} due within the next 7 days.</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {upcomingPayments.map(({ card, dueDate }) => (
                  <div key={card.id} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <span className="text-white font-semibold text-sm">{card.title}</span>
                    <span className="w-px h-3 bg-white/10" />
                    <span className="text-emergency font-bold text-sm">
                      {dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emergency/10 rounded-full blur-2xl animate-pulse" />
          </div>
        </section>
      )}

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
                  You'll get up to <span className={`font-bold text-2xl px-2 ${(recommendation?.daysToRepay ?? 0) < 14 ? "text-emergency" : "text-white"}`}>{recommendation?.daysToRepay}</span> days to repay this purchase.
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
                  <CreditCard card={recommendation.bestCard} isBest daysToRepay={recommendation.daysToRepay} />
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
            {cards.map((card) => {
              const recommendationForCard = getCardRecommendation(card);
              return (
                <CreditCard
                  key={card.id}
                  card={card}
                  isBest={card.id === recommendation?.bestCard.id}
                  daysToRepay={recommendationForCard.daysToRepay}
                />
              );
            })}
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
