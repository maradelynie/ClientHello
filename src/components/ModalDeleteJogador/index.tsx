import { useState } from 'react'
import { useParams } from 'react-router-dom'
import * as api from '../../sevices'
import './style.scss'

type ModalDeleteJogadorType = {
  close: () => void,
  getTournament?: () => void,
  open: boolean,
  edit?:boolean,
  player: jogadorType ,
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
function ModalDeleteJogador({ open, close, player, getTournament}:ModalDeleteJogadorType) {
  const {id} = useParams()
  const handleDelete = async (e:React.MouseEvent) => {
    if(getTournament){
      e.preventDefault()
      await api.deletePlayer({key:player.key},id||'')
      getTournament()
      close()
    }
  }
  if(open) {return (
    <div className="modalJogador-container">
      <form>
        <h3>Deletar jogador</h3>
        <span>Após deletar o jogador não será possivel reaver os dados,</span><span> tem certeza que deseja continuar?</span>
          <div  className="modalCadastro-submit">
            <button className="danger" onClick={close}>cancelar</button>
            <button onClick={e=>handleDelete(e)}>salvar</button>
          </div>
      </form>
    </div>
  )}else return (<></>)
}

export default ModalDeleteJogador;