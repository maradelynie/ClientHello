import { createContext, useContext, useState } from 'react'


type MatchProps = {
  children: JSX.Element,
};

type UseMatch = {
  id: string,
  category: string,
  runnerA: RacerType,
  runnerB: RacerType,
  tournament: string,
  winner: string,
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
type ReacersType = {
  average_speed: number,
  category: string,
  id:number,
  key:string,
  name:string,
  times_played:number
  victories:number,
  dead: boolean,
  wos: number
}
type UseMatchProps = {
  match: UseMatch | '',
  setupMatch: (match:UseMatch)=>void,
  players: ReacersType[] | [],
  setupPlayers: (racers:ReacersType[])=>void,
}
const MatchContext = createContext<UseMatchProps>({
  match:'',
  setupMatch:(match:UseMatch)=>{return},
  players: [],
  setupPlayers: (racers:ReacersType[])=>{return}
})

const MatchProvider = ({children}:MatchProps) => {
  const [match, setMatch] = useState<UseMatch|''>('')
  const [players, setPlayers] = useState<ReacersType[]|[]>([])

  const setupMatch = (value:UseMatch) => {
    setMatch(value||'')
    return
  }
  const setupPlayers = (value:ReacersType[]) => {
    setPlayers(value||[])
    return
  }

  return (
    <MatchContext.Provider
      value={{
        match,
        setupMatch,
        players,
        setupPlayers
      }}
    >
      {children}
    </MatchContext.Provider>
  )
}

function useMatch() {
  const context = useContext(MatchContext)

  return context
}

export { MatchProvider, useMatch }
