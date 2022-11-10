type ModalDeleteTournamentType = {
  close: () => void;
  open: boolean;
  handleDeleteTournament: () => void;
};
function ModalDeleteTournament({
  open,
  close,
  handleDeleteTournament,
}: ModalDeleteTournamentType) {
  if (open) {
    return (
      <div className="modalJogador-container">
        <main>
          <h3>Deletar torneio</h3>
          <form>
            <span>
              Após deletar o torneio não será possivel reaver os dados,
            </span>
            <span> tem certeza que deseja continuar?</span>
            <div className="modalCadastro-submit">
              <button type="button" className="danger" onClick={close}>
                cancelar
              </button>
              <button type="button" onClick={() => handleDeleteTournament()}>
                Sim
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  } else return <></>;
}

export default ModalDeleteTournament;
