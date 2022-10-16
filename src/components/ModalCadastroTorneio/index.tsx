import { useState } from 'react'
import * as api from '../../sevices'
import './style.scss'

type ModalCadastroTorneioType = {
  close: () => void,
  open: boolean
}

function ModalCadastroTorneio({ open, close}:ModalCadastroTorneioType) {
  const [name, setName] = useState('')
  const handleSubmit = async ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    await api.postTorunaments({name:name})
    close()
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
