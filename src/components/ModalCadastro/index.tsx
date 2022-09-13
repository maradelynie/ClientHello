import { useState } from 'react'
import './style.scss'

type ModalCadastroType = {
  setP1Name: (value: string) => void,
  setP2Name: (value: string) => void,
  handleStart: () => void,
  close: () => void,
  open: boolean
}

function ModalCadastro({setP1Name, setP2Name, open, close, handleStart}:ModalCadastroType) {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const handleSubmit = ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    setP1Name(p1)
    setP2Name(p2)
    handleStart()
    close()
  }
  if(open) {return (
    <div className="modalCadastro-container">
      <form onSubmit={handleSubmit}>
        <h3>Cadastre os jogadores</h3>
        <input type="text" placeholder='Player 1' required value={p1} onChange={(e)=>setP1(e.target.value)}/>
        <input type="text" placeholder='Player 2' required value={p2} onChange={(e)=>setP2(e.target.value)}/>
        <div  className="modalCadastro-submit">
          <button onClick={close}>Cancelar</button>
          <button type='submit'>Cadastrar</button>
        </div>
       
      </form>
    </div>
  )}else return (<></>)
}

export default ModalCadastro;
