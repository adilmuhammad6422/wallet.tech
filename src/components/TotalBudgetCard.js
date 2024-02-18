import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();

  // Calculate total amounts and max for both money and swipes
  let totalAmount = 0;
  let totalMax = 0;
  let totalSwipesAmount = 0;
  let totalSwipesMax = 0;

  budgets.forEach(budget => {
    const budgetExpenses = expenses.filter(expense => expense.budgetId === budget.id);
    const budgetTotal = budgetExpenses.reduce((total, expense) => total + expense.amount, 0);
    
    if (budget.isSwipe) {
      totalSwipesAmount += budgetTotal;
      totalSwipesMax += budget.max;
    } else {
      totalAmount += budgetTotal;
      totalMax += budget.max;
    }
  });

  // State to toggle between showing money totals or swipes totals
  const [showSwipes, setShowSwipes] = useState(false);

  // Toggle function
  const onToggleShowSwipes = () => setShowSwipes(!showSwipes);

  return (
    <div>
      <BudgetCard
        amount={showSwipes ? totalSwipesAmount : totalAmount}
        name={showSwipes ? "Total Swipes" : "Total"}
        gray
        max={showSwipes ? totalSwipesMax : totalMax}
        hideButtons
      />
      <Button onClick={onToggleShowSwipes} className="blue-outline-button" size="sm">
        {showSwipes ? "Show Money Total" : "Show Swipes Total"}
      </Button>
    </div>
  );
}
