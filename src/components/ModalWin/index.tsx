import './style.scss'

type ModalWinType = {
  player: string,
  open: boolean,
  close: ()=>void
}

function ModalWin({player,open, close}:ModalWinType) {
  if(open) {return (
    <div className="modalWin-container">
      <h3>Ganhador da partida: {player}</h3>
      <button onClick={close}>Voltar</button>
    </div>
  )}else return (<></>)
}

export default ModalWin;
