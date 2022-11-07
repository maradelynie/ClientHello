
type ModalDeleteTournamentType = {
  close: () => void,
  open: boolean,
  handleDeleteTournament: ()=>void
}
function ModalDeleteTournament({ open, close, handleDeleteTournament}:ModalDeleteTournamentType) {
  
  if(open) {return (
    <div className="modalJogador-container">
      <form>
        <h3>Deletar torneio</h3>
        <span>Após deletar o torneio não será possivel reaver os dados,</span><span> tem certeza que deseja continuar?</span>
          <div  className="modalCadastro-submit">
            <button type="button" className="danger" onClick={close}>cancelar</button>
            <button type="button" onClick={()=>handleDeleteTournament()}>Sim</button>
          </div>
      </form>
    </div>
  )}else return (<></>)
}

export default ModalDeleteTournament;