import { useState } from "react";
import { useMatch } from "../../hooks/useMatch";
import "./style.scss";

type ModalCadastroType = {
  handleStart: () => void;
  close: () => void;
  invert: () => void;
  open: boolean;
};
function ModalStart({ open, close, invert, handleStart }: ModalCadastroType) {
  const { match } = useMatch();
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleStart();
  };
  if (open && match && match.runnerB) {
    return (
      <div className="modalCadastro-container">
        <main>
          <form onSubmit={handleSubmit}>
            <h3>Iniciar partida</h3>

            <div className="modalCadastro-players">
              <div className="card">
                <h5>Jogador: {match.runnerA.name}</h5>
                <h5>Partidas: {match.runnerA.times_played}</h5>
                <h5>Vitorias: {match.runnerA.victories}</h5>
              </div>
              <div className="card">
                <h5>Jogador: {match.runnerB.name}</h5>
                <h5>Partidas: {match.runnerB.times_played}</h5>
                <h5>Vitorias: {match.runnerB.victories}</h5>
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
