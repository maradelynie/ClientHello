import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as api from '../../sevices'

type ModalDeleteJogadorType = {
  close: () => void,
  getTournament?: () => void,
  open: boolean,
  edit?:boolean,
  player: jogadorType ,
  setBackdropStatus: (status:boolean)=>void
  setMessageStatus:(message:string)=>void
}
type jogadorType = {
  key:string,
  name: string,
  category: string,
  average_speed: number ,
  dead: boolean ,
  times_played: number ,
  victories: number ,
  wos: number 
}
function ModalDeleteJogador({ open, close, player, getTournament,setBackdropStatus,setMessageStatus}:ModalDeleteJogadorType) {
  const {id} = useParams()
  const handleDelete = async (e:React.MouseEvent) => {
      e.preventDefault()
      if(getTournament){
      try{
        setBackdropStatus(true)
        await api.deletePlayer({key:player.key},id||'')
        getTournament()
        close()
      }catch{
        setMessageStatus("Erro ao deletar jogador")
      }
      
    }
  }
  if(open) {return (
    <div className="modalJogador-container">
      <form>
        <h3>Deletar jogador</h3>
        <span>Após deletar o jogador não será possivel reaver os dados,</span><span> tem certeza que deseja continuar?</span>
          <div  className="modalCadastro-submit">
            <button className="danger" onClick={close}>cancelar</button>
            <button onClick={e=>handleDelete(e)}>Sim</button>
          </div>
      </form>
    </div>
  )}else return (<></>)
}

export default ModalDeleteJogador;