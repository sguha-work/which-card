import type { CreditCard, Recommendation } from "../types";

export function getCardRecommendation(card: CreditCard, today: Date = new Date()): Recommendation {
  // 1. Calculate next statement date
  let nextStatement = new Date(today);
  nextStatement.setHours(0, 0, 0, 0);
  nextStatement.setDate(card.billGenerationDate);

  // If today is the generation date, it might go to the next month's bill 
  // depending on the bank's cutoff, but usually it's the next month.
  if (nextStatement <= today) {
    nextStatement.setMonth(nextStatement.getMonth() + 1);
  }

  // 2. Calculate due date for that next statement
  let dueDate = new Date(nextStatement);
  dueDate.setDate(card.billPaymentDate);
  
  // If due date is before or same as statement date, it must be next month
  if (dueDate <= nextStatement) {
    dueDate.setMonth(dueDate.getMonth() + 1);
  }

  // 3. Calculate total days from today until due date
  const diffTime = dueDate.getTime() - today.getTime();
  const daysToRepay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    bestCard: card,
    daysToRepay,
    statementDate: nextStatement,
    dueDate: dueDate,
  };
}

export function getBestCard(cards: CreditCard[], today: Date = new Date()): Recommendation | null {
  if (cards.length === 0) return null;

  const recommendations = cards.map((card) => getCardRecommendation(card, today));

  // Sort by days to repay descending
  return recommendations.sort((a, b) => b.daysToRepay - a.daysToRepay)[0];
}

export function getDaysRemaining(targetDate: Date, today: Date = new Date()): number {
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
