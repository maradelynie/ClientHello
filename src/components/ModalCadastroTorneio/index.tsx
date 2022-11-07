import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as api from '../../sevices'
import './style.scss'

type ModalCadastroTorneioType = {
  close: () => void,
  open: boolean,
  setBackdropStatus:(status:boolean)=>void,
  setMessageStatus: (message:string)=>void
}

function ModalCadastroTorneio({ open, close, setBackdropStatus, setMessageStatus}:ModalCadastroTorneioType) {
  const navigate = useNavigate();
  const [name, setName] = useState('')
  const handleSubmit = async ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    try{
      setBackdropStatus(true)
      await api.postTorunaments({name:name})
      navigate('/load')
    }catch{
      setMessageStatus("Erro ao cadastrar Torneio")
    }
  }
  if(open) {return (
    <div className="modalCadastroTorneio-container">
        <h3>Cadastre o campeonato</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' required value={name} onChange={(e)=>setName(e.target.value)}/>
        <div  className="modalCadastro-submit">
          <button  type='button' className="danger" onClick={close}>Cancelar</button>
          <button type='submit'>Cadastrar</button>
        </div>
       
      </form>
    </div>
  )}else return (<></>)
}

export default ModalCadastroTorneio;
