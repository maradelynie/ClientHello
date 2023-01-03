import './style.scss'

type ModalCountType = {
  countDown: number
  open: boolean
}

function ModalCount({ countDown, open }: ModalCountType) {
  if (open) {
    return (
      <div className="modalCount-container">
        <h1>{countDown || '0'}</h1>
      </div>
    )
  } else return <></>
}

export default ModalCount
