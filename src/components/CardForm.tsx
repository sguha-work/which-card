import { useState, useEffect } from "react";
import type { CreditCard } from "../types";

interface CardFormProps {
  initialCard?: CreditCard | null;
  onSubmit: (card: Omit<CreditCard, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

export function CardForm({ initialCard, onSubmit, onCancel }: CardFormProps) {
  const [title, setTitle] = useState(initialCard?.title || "");
  const [billGenerationDate, setBillGenerationDate] = useState(
    initialCard?.billGenerationDate?.toString() || ""
  );
  const [billPaymentDate, setBillPaymentDate] = useState(
    initialCard?.billPaymentDate?.toString() || ""
  );

  useEffect(() => {
    if (initialCard) {
      setTitle(initialCard.title);
      setBillGenerationDate(initialCard.billGenerationDate.toString());
      setBillPaymentDate(initialCard.billPaymentDate.toString());
    }
  }, [initialCard]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const genDate = parseInt(billGenerationDate);
    const payDate = parseInt(billPaymentDate);

    if (!title || isNaN(genDate) || isNaN(payDate)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    if (genDate < 1 || genDate > 31 || payDate < 1 || payDate > 31) {
      alert("Dates must be between 1 and 31.");
      return;
    }

    onSubmit({
      id: initialCard?.id,
      title,
      billGenerationDate: genDate,
      billPaymentDate: payDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-400">Card Title / Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. HDFC Millennia"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-400">Generation Date</label>
          <input
            type="number"
            min="1"
            max="31"
            value={billGenerationDate}
            onChange={(e) => setBillGenerationDate(e.target.value)}
            placeholder="Day (1-31)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-400">Payment Date</label>
          <input
            type="number"
            min="1"
            max="31"
            value={billPaymentDate}
            onChange={(e) => setBillPaymentDate(e.target.value)}
            placeholder="Day (1-31)"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 rounded-xl bg-white/5 text-slate-300 font-medium hover:bg-white/10 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-6 py-3 rounded-xl brand-gradient text-white font-bold shadow-lg shadow-brand-primary/20 hover:scale-[1.02] transition-transform"
        >
          {initialCard ? "Update Card" : "Add Card"}
        </button>
      </div>
    </form>
  );
}
