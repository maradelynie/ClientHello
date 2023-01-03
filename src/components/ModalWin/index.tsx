import './style.scss'

type ModalWinType = {
  player: RacerType | ''
  winnerSpeed: number
  open: boolean
  actualTime: number
  close: () => void
  handleRestart: () => void
  handleSave: () => void
  quickPlayMode: boolean
}
type RacerType = {
  id: string | null
  name: string
  average_speed: number
  wos: number
  times_played: number
  victories: number
  category: string
  tournament?: string
  dead: boolean
}
function ModalWin({
  player,
  winnerSpeed,
  open,
  close,
  quickPlayMode,
  actualTime,
  handleRestart,
  handleSave
}: ModalWinType) {
  const showTimer = (time: number) => {
    return (
      <>
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        {('0' + ((time / 10) % 100)).slice(-2)}
      </>
    )
  }
  const handleCancel = () => {
    handleRestart()
    close()
  }
  if (open && player) {
    return (
      <div className="modalWin-container">
        <main>
          <h3>Ganhador da partida:</h3>
          <div className="card">
            <p>nome: {player.name}</p>

            <p>velocidade: {winnerSpeed} km/h</p>
            <p>tempo: {showTimer(actualTime)}</p>
          </div>
          <div className="modalWin-submit">
            {quickPlayMode ? (
              <button type="button" className="danger" onClick={close}>
                Fechar
              </button>
            ) : (
              <>
                <button type="button" className="danger" onClick={handleCancel}>
                  Cancelar Partida
                </button>
                <button type="button" onClick={handleSave}>
                  Salvar Partida
                </button>
              </>
            )}
          </div>
        </main>
      </div>
    )
  } else return <></>
}

export default ModalWin
