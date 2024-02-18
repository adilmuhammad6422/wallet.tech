import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
  isSwipe, // Add isSwipe prop
}) {
  const classNames = [];
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10");
  } else if (gray) {
    classNames.push("bg-light");
  }

  // Ensure amount and max are numbers
  amount = Number(amount) || 0;
  max = Number(max) || 0;

  // Function to decide how to display amounts
  const formatAmountDisplay = (amount, max, isSwipe) => {
    if (!isSwipe) {
      return `$${amount} / $${max}`; // Display as swipes
    } else {
      // Display as currency
      return `${amount} / ${max} Swipes`;
    }
  };

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {formatAmountDisplay(amount, max, isSwipe)} {/* Use the new function for displaying amount */}
          </div>
        </Card.Title>
        {max > 0 && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpensesClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

function getProgressBarVariant(amount, max) {
  // If max is 0, to avoid division by zero, return 'primary'
  if (max === 0) return "primary"; 

  const ratio = amount / max;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
}
