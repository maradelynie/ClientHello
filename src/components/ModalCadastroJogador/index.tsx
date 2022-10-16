import { useState } from 'react'
import * as api from '../../sevices'
import './style.scss'

type ModalCadastroJogadorType = {
  close: () => void,
  getTournament: () => void,
  open: boolean,
  tournamentId: string 
}

function ModalCadastroJogador({ open, close, tournamentId,getTournament}:ModalCadastroJogadorType) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const handleSubmit = async ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    await api.postPlayer({name:name, category},tournamentId)
    getTournament()
    close()
  }
  if(open) {return (
    <div className="modalCadastroJogador-container">
      <form onSubmit={handleSubmit}>
        <h3>Cadastre o jogador</h3>
        <input type="text" placeholder='Nome' required value={name} onChange={(e)=>setName(e.target.value)}/>
        <select required value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="sem">Sem Gênero</option>
          <option value="fem">Feminino</option>
          <option value="mas">Masculino</option>
        </select>
        <div  className="modalCadastro-submit">
          <button className="danger" onClick={close}>Cancelar</button>
          <button type='submit'>Cadastrar</button>
        </div>
       
      </form>
    </div>
  )}else return (<></>)
}

export default ModalCadastroJogador;
