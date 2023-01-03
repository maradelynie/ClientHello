import './style.scss'

type AlertType = {
  open: boolean
  close: () => void
  message: string
}

function Alert({ open, close, message }: AlertType) {
  if (open) {
    return (
      <div className="alert-container">
        <p>{message}</p>
        <button type="button" className="danger" onClick={close}>
          Fechar
        </button>
      </div>
    )
  } else return <></>
}

export default Alert
