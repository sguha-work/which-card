import { useState } from "react";
import { Plus, Pencil, Trash2, CreditCard as CardIcon } from "lucide-react";
import type { CreditCard as CardType } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Modal } from "../components/ui/Modal";
import { CardForm } from "../components/CardForm";
import { CreditCard } from "../components/CreditCard";
import { AnimatePresence } from "framer-motion";

export function ManageCards() {
  const [cards, setCards] = useLocalStorage<CardType[]>("credit-cards", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CardType | null>(null);

  const handleAddEdit = (cardData: Omit<CardType, "id"> & { id?: string }) => {
    if (editingCard) {
      setCards(cards.map(c => c.id === editingCard.id ? { ...cardData, id: c.id } as CardType : c));
    } else {
      const newCard: CardType = {
        ...cardData,
        id: crypto.randomUUID(),
      };
      setCards([...cards, newCard]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const openModal = (card: CardType | null = null) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingCard(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-12">
      <header className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">Your Cards</h1>
          <p className="text-slate-400">Manage your credit cards and billing cycles.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl brand-gradient text-white font-bold shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Add Card
        </button>
      </header>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-[3rem] border-dashed border-white/10">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <CardIcon className="text-slate-500" size={32} />
          </div>
          <p className="text-slate-400 text-lg mb-6">No credit cards added yet.</p>
          <button
            onClick={() => openModal()}
            className="text-brand-primary font-bold hover:underline"
          >
            Add your first card
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <CreditCard
                key={card.id}
                card={card}
                actions={
                  <>
                    <button
                      onClick={() => openModal(card)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/5 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                }
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCard ? "Edit Credit Card" : "Add Credit Card"}
      >
        <CardForm
          initialCard={editingCard}
          onSubmit={handleAddEdit}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
