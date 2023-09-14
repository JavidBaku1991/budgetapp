import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import BüdcəModal from "./components/BüdcəModal"
import XərcModal from "./components/XərcModal"
import Xərclər from "./components/Xərclər"
import Büdcəkartı from "./components/BüdcəKartı"
import ÜmumiBüdcə from "./components/ÜmumiBüdcə"
import { useState } from "react"
import { useBudgets } from "./components/Context"
import { Fragment } from "react"
function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <Fragment >
<Container className="my-4" >
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto" style={{}}>Büdcələr</h1>
          <Button variant="success" onClick={() => setShowAddBudgetModal(true)}>
            Yeni Büdcə 
          </Button>
          <Button variant="light" onClick={openAddExpenseModal}>
            Yeni xərc 
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            const məbləğ = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            )
            return (
              <Büdcəkartı
                key={budget.id}
                name={budget.name}
                amount={məbləğ}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            ) 
          })}
       
          <ÜmumiBüdcə />
        </div>
      </Container>
      <BüdcəModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <XərcModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <Xərclər
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    
    </Fragment>
      
  )
}

export default App