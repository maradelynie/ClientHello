import { useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../sevices";
import "./style.scss";

type ModalJogadorType = {
  close: () => void;
  getTournament?: () => void;
  open: boolean;
  player: jogadorType;
  edit?: boolean;
  setBackdropStatus?: (status: boolean) => void;
  setMessageStatus?: (message: string) => void;
};
type jogadorType = {
  name: string;
  category: string;
  average_speed: number;
  dead: boolean;
  times_played: number;
  victories: number;
  wos: number;
};
function ModalJogador({
  open,
  close,
  player,
  edit,
  getTournament,
  setBackdropStatus,
  setMessageStatus,
}: ModalJogadorType) {
  const { id } = useParams();
  const [playerData, setPlayerData] = useState(player);
  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (getTournament && setBackdropStatus && setMessageStatus) {
      try {
        setBackdropStatus(true);
        await api.putPlayer(playerData, id || "");
        getTournament();
        close();
      } catch {
        setMessageStatus("Erro ao editar jogador");
      }
    }
  };
  if (open) {
    return (
      <div className="modalJogador-container">
        <main>
          <h3>Dados do jogador</h3>
          <form>
            <div>
              <label htmlFor="name_viewPLayer">
                Nome
                <input
                  type="text"
                  id="name_viewPLayer"
                  required
                  onChange={(e) =>
                    setPlayerData((player) => ({
                      ...player,
                      name: e.target.value,
                    }))
                  }
                  value={playerData.name}
                  disabled={!edit}
                />
              </label>
              <label htmlFor="category_viewPLayer">
                Categoria
                <div className="select-container">
                  <select
                    id="category_viewPLayer"
                    required
                    onChange={(e) => {
                      setPlayerData((player) => ({
                        ...player,
                        category: e.target.value,
                      }));
                    }}
                    defaultValue={playerData.category}
                    disabled={!edit}
                  >
                    <option value="sem">Sem Gênero</option>
                    <option value="fem">Feminino</option>
                    <option value="mas">Masculino</option>
                  </select>
                </div>
              </label>
              <label htmlFor="average_viewPLayer">
                Velocidade média
                <input
                  id="average_viewPLayer"
                  type="text"
                  required
                  onChange={(e) =>
                    setPlayerData((player) => ({
                      ...player,
                      average_speed: Number(e.target.value),
                    }))
                  }
                  value={playerData.average_speed}
                  disabled={!edit}
                />
              </label>
              <label htmlFor="dead_viewPLayer">
                Morto
                <div className="select-container">
                  <select
                    id="dead_viewPLayer"
                    required
                    onChange={(e) => {
                      setPlayerData((player) => ({
                        ...player,
                        dead: e.target.value === "sim",
                      }));
                    }}
                    defaultValue={playerData.dead ? "sim" : "nao"}
                    disabled={!edit}
                  >
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>
              </label>
              <label htmlFor="times_viewPLayer">
                Vezes em jogo
                <input
                  id="times_viewPLayer"
                  type="text"
                  required
                  onChange={(e) =>
                    setPlayerData((player) => ({
                      ...player,
                      times_played: Number(e.target.value),
                    }))
                  }
                  value={playerData.times_played}
                  disabled={!edit}
                />
              </label>
              <label htmlFor="victories_viewPLayer">
                Vitorias
                <input
                  id="victories_viewPLayer"
                  type="text"
                  required
                  onChange={(e) =>
                    setPlayerData((player) => ({
                      ...player,
                      victories: Number(e.target.value),
                    }))
                  }
                  value={playerData.victories}
                  disabled={!edit}
                />
              </label>
              <label htmlFor="wos_viewPLayer">
                WOs
                <input
                  id="wos_viewPLayer"
                  type="text"
                  required
                  onChange={(e) =>
                    setPlayerData((player) => ({
                      ...player,
                      wos: Number(e.target.value),
                    }))
                  }
                  value={playerData.wos}
                  disabled={!edit}
                />
              </label>
            </div>

            {!edit ? (
              <div className="modalCadastro-submit">
                <button type="button" onClick={close}>
                  ok
                </button>
              </div>
            ) : (
              <div className="modalCadastro-submit">
                <button type="button" className="danger" onClick={close}>
                  cancelar
                </button>
                <button type="button" onClick={(e) => handleSave(e)}>
                  salvar
                </button>
              </div>
            )}
          </form>
        </main>
      </div>
    );
  } else return <></>;
}

export default ModalJogador;
