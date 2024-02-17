import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useState, useEffect } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetsContext";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudgets();

  // State for totals
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalMax, setTotalMax] = useState(0);
  const [totalSpentOnSwipes, setTotalSpentOnSwipes] = useState(0);
  const [totalSwipesMax, setTotalSwipesMax] = useState(0);

  // Recalculate totals whenever budgets or expenses change
  useEffect(() => {
    let newTotalSpent = 0;
    let newTotalMax = 0;
    let newTotalSpentOnSwipes = 0;
    let newTotalSwipesMax = 0;

    budgets.forEach(budget => {
      const max = Number(budget.max) || 0;
      const max2 = Number(budget.max) || 0;
      const expenses = getBudgetExpenses(budget.id);
      const budgetTotal = expenses.reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
      const budgetTotalSwipes = expenses.reduce((total, expense2) => total + (Number(expense2.amount) || 0), 0);

      if (budget.isSwipe) {
        newTotalSpentOnSwipes += budgetTotalSwipes;
        newTotalSwipesMax += max2;
      } else {
        newTotalSpent += budgetTotal;
        newTotalMax += max;
      }
    });

    setTotalSpent(newTotalSpent);
    setTotalMax(newTotalMax);
    setTotalSpentOnSwipes(newTotalSpentOnSwipes);
    setTotalSwipesMax(newTotalSwipesMax);
  }, [budgets, getBudgetExpenses]);

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Wallet.tech</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}> 
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}>
          {budgets.map(budget => (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={getBudgetExpenses(budget.id).reduce((total, expense) => total + Number(expense.amount), 0)}
              max={budget.max}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
              isSwipe={budget.isSwipe}
            />
          ))}
          <UncategorizedBudgetCard
            onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard
            name="Total"
            amount={totalSpent.toFixed(2)}
            max={totalMax.toFixed(2)}
            isSwipe={false}
          />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
