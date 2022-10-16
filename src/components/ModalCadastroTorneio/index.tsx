import { useState } from 'react'
import * as api from '../../sevices'
import './style.scss'

type ModalCadastroTorneioType = {
  close: () => void,
  open: boolean,
  setBackdropStatus:(status:boolean)=>void,
  getTournament: ()=>void,
  setMessageStatus: (message:string)=>void
}

function ModalCadastroTorneio({ open, close, setBackdropStatus, getTournament,setMessageStatus}:ModalCadastroTorneioType) {
  const [name, setName] = useState('')
  const handleSubmit = async ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    try{
      setBackdropStatus(true)
      await api.postTorunaments({name:name})
      getTournament()
      close()
    }catch{
      setMessageStatus("Erro ao cadastrar Torneio")
    }
  }
  if(open) {return (
    <div className="modalCadastroTorneio-container">
      <form onSubmit={handleSubmit}>
        <h3>Cadastre o campeonato</h3>
        <input type="text" placeholder='Nome' required value={name} onChange={(e)=>setName(e.target.value)}/>
        <div  className="modalCadastro-submit">
          <button className="danger" onClick={close}>Cancelar</button>
          <button type='submit'>Cadastrar</button>
        </div>
       
      </form>
    </div>
  )}else return (<></>)
}

export default ModalCadastroTorneio;
