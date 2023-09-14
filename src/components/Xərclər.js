import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets } from "./Context"


const currencyFormatter = new Intl.NumberFormat(undefined
      , 
      {
      currency: "azn",
      style: "currency",
      minimumFractionDigits: 0,
    }
    )

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets()

  const expenses = getBudgetExpenses(budgetId)
  const budget = 'Uncategorized'=== budgetId
      ? { name: "Uncategorized", id:'Uncategorized'}
      : budgets.find(b => b.id === budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses - {budget?.name}</div>
            {budgetId !== 'Uncategorized' && (
              <Button
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}