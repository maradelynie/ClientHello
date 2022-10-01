import './style.scss'

type ModalWinType = {
  player: string,
  open: boolean,
  actualTime: number,
  close: ()=>void
}

function ModalWin({player,open, close, actualTime}:ModalWinType) {
  const showTimer = (time: number) => {
    return (
      <>
        <span className="digits">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits"> 
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </>
    );
  };
  if(open) {return (
    <div className="modalWin-container">
      <h3>Ganhador da partida: {player}</h3>
      <h3>tempo: {showTimer(actualTime)}</h3>
      <button onClick={close}>Voltar</button>
    </div>
  )}else return (<></>)
}

export default ModalWin;
