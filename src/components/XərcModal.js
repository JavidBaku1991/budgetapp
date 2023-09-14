import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets} from "./Context"

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpense, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Yeni xərc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Ad</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Məbləğ</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={1}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Büdcə</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              {/* <option id='Uncategorized'>{budgets[0]}</option> */}
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="success" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}