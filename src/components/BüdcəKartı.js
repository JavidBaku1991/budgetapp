import { Button, Card, ProgressBar, Stack } from "react-bootstrap"
 const currencyFormatter = new Intl.NumberFormat(undefined
    , 
    {
    currency: "azn",
    style: "currency",
    minimumFractionDigits: 0,
  }
  )


export default function BüdcəKartı({
  name,
  amount,
  max,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } 

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(amount)} 

              <span>/{currencyFormatter.format(max)}</span>
           </div>
        </Card.Title>
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        
        {!hideButtons && (
          <Stack direction="horizontal" gap="2" className="mt-4">
            <Button
              variant="success"
              className="ms-auto"
              onClick={onAddExpenseClick}
>
              Əlavə xərcləmə
            </Button>
            <Button onClick={onViewExpensesClick} variant="warning">
              Məlumat
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function getProgressBarVariant(amount, max) {
  const ratio = amount / max
  if (ratio < 0.5) return "primary"
  if (ratio < 0.75) return "warning"
  return "danger"
}