import { RacerType } from "../../types/useMatch";
import "./style.scss";

type ModalCadastroType = {
  handleStart: () => void;
  close: () => void;
  invert: () => void;
  open: boolean;
  p1: RacerType | false;
  p2: RacerType | false;
};
function ModalStart({
  open,
  close,
  invert,
  handleStart,
  p1,
  p2,
}: ModalCadastroType) {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleStart();
  };
  if (open && p1 && p2) {
    return (
      <div className="modalCadastro-container">
        <main>
          <form onSubmit={handleSubmit}>
            <h3>Iniciar partida</h3>

            <div className="modalCadastro-players">
              <div className="card">
                <h5>Jogador: {p1.name}</h5>
                <h5>Partidas: {p1.times_played}</h5>
                <h5>Vitorias: {p1.victories}</h5>
              </div>
              <div className="card">
                <h5>Jogador: {p2.name}</h5>
                <h5>Partidas: {p2.times_played}</h5>
                <h5>Vitorias: {p2.victories}</h5>
              </div>
            </div>

            <div className="modalCadastro-submit">
              <button type="button" className="danger" onClick={close}>
                Cancelar
              </button>
              <button type="button" onClick={invert}>
                Inverter posições
              </button>
              <button type="submit">Iniciar</button>
            </div>
          </form>
        </main>
      </div>
    );
  } else return <></>;
}

export default ModalStart;
