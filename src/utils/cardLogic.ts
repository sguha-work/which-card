import type { CreditCard, Recommendation } from "../types";

export function getCardRecommendation(card: CreditCard, today: Date = new Date()): Recommendation {
  // 1. Calculate next statement date
  let nextStatement = new Date(today);
  nextStatement.setHours(0, 0, 0, 0);
  
  // Using x+1 as the generation date for conservative calculations (logic only)
  nextStatement.setDate(card.billGenerationDate + 1);

  // If today is the generation date, it might go to the next month's bill 
  // depending on the bank's cutoff. Using x+1 ensures we treat today as 
  // falling in the current cycle if today is the generation date.
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

  // 4. Adjust dates back for UI display (using original x)
  const displayStatement = new Date(nextStatement);
  displayStatement.setDate(card.billGenerationDate);
  
  // If we shifted the month for displayStatement but it shouldn't have shifted for x,
  // we handle that here. But the month shift in step 1 is what we want to "stick".
  
  return {
    bestCard: card,
    daysToRepay,
    statementDate: displayStatement,
    dueDate: dueDate, // Due date is already based on the payment day
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

export function getUpcomingPayments(cards: CreditCard[], days: number = 7, today: Date = new Date()): { card: CreditCard, dueDate: Date }[] {
  return cards
    .map(card => {
      // Find next occurrence of billPaymentDate
      let dueDate = new Date(today.getFullYear(), today.getMonth(), card.billPaymentDate);
      dueDate.setHours(0, 0, 0, 0);

      // If due date this month has passed, the next one is next month
      if (dueDate < today && today.getDate() !== card.billPaymentDate) {
        dueDate.setMonth(dueDate.getMonth() + 1);
      }

      const diffDays = getDaysRemaining(dueDate, today);
      
      return { card, dueDate, diffDays };
    })
    .filter(item => item.diffDays >= 0 && item.diffDays <= days)
    .sort((a, b) => a.diffDays - b.diffDays);
}
