import { useState } from 'react'
import './style.scss'

type ModalCadastroType = {
  playerA: RacerType|'',
  playerB: RacerType|'',
  handleStart: () => void,
  close: () => void,
  invert: () => void,
  open: boolean
}
type RacerType = {
  id: string|null,
  name: string,
  average_speed: number,
  wos: number,
  times_played: number,
  victories: number,
  category: string,
  tournament: string,
  dead: boolean,
}

function ModalStart({playerA, playerB, open, close, invert, handleStart}:ModalCadastroType) {
  const handleSubmit = ( e:React.SyntheticEvent ) => {
    e.preventDefault()
    handleStart()
  }
  if(open) {return (
    <div className="modalCadastro-container">
      <form onSubmit={handleSubmit}>
        <h3>Iniciar partida</h3>
          
        {playerA&&playerB && 
          <div className="modalCadastro-players">
            <div className='card'>
              <h5>Jogador: {playerA.name}</h5> 
              <h5>Partidas: {playerA.times_played}</h5> 
              <h5>Vitorias: {playerA.victories}</h5> 
            </div>
            <div className='card'>
              <h5>Jogador: {playerB.name}</h5> 
              <h5>Partidas: {playerB.times_played}</h5> 
              <h5>Vitorias: {playerB.victories}</h5> 
            </div>
          </div>
        }
       
        <div  className="modalCadastro-submit">
          <button type="button" className="danger" onClick={close}>Cancelar</button>
          <button type="button" onClick={invert}>Inverter posições</button>
          <button type='submit'>Iniciar</button>
        </div>
       
      </form>
    </div>
  )}else return (<></>)
}

export default ModalStart;
