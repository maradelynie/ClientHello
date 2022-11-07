import "./style.scss";
import React, { useEffect, useState } from "react";
import * as api from '../../sevices'
import {  Play } from 'react-feather';
import { useNavigate, useParams } from "react-router-dom";
import ModalJogador from "../../components/ModalJogador";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";
import { useMatch } from "../../hooks/useMatch";

type TournamentType = {
  category: string, current_race: string, current_round: string, graph: GraphType[]
}
type GraphType = string[]
type MatchsType = RaceType[]

type RaceType = {
  id: string,
  category: string,
  runnerA: string,
  runnerB: string,
  tournament: string,
  winner: string,
}
type RacerType = {
  id: string,
  name: string,
  average_speed: number,
  wos: number,
  times_played: number,
  victories: number,
  category: string,
  tournament: string,
  dead: boolean,
}



function Tournament() {
  const {id} = useParams()
  const {category} = useParams()
  const {setupMatch} = useMatch()
  const navigate = useNavigate();
  const [backdropStatus, setBackdropStatus] = useState(true);
  const [tournament, setTournament] = useState<TournamentType|''>('');
  const [races, setRaces] = useState<MatchsType[]|[]>([]);
  const [players, setPlayers] = useState<RacerType[]|[]>([]);
  const [messageStatus, setMessageStatus] = useState('');
  const [viewPlayerData, setViewPlayerData] = useState<RacerType|''>('');

  const getTournament = async () => {
    try{
      setBackdropStatus(true)
      const tournamentKeys = await api.getTournamentKeys(id||'',category||'' )
      const allRaces = await Promise.all(tournamentKeys.graph.map(async (races:string[]) => {
        if(races.length){
          return await Promise.all( races.map( async (race:string) => {
              if(!race) return ''
              const dados = await api.getRace(race||'',id||'') 
              if(!dados.runnerB) {
                const raceData = {...dados, id:race, winner:dados.runnerA}
                await api.putRace(raceData, id||'')
                return raceData
              }
              return {...dados, id:race}
            }))
        }
        return ''
        }))
      const racers = allRaces[1].reduce((add:string[],race:RaceType)=>{
        return [...add,race.runnerA,race.runnerB ]
      },[])
      const allPlayers = await Promise.all( racers.map( async (racer:string) => {
              if(!racer) return ''
              const dados = await api.getRacer(racer||'',id||'')
              return{ ...dados, id:racer }
            }
          )
        )
     
      setPlayers(allPlayers)
      setRaces(allRaces)
      setTournament(tournamentKeys)
    }catch{
      setMessageStatus("Erro ao carregar chaves")
    }finally{
      setBackdropStatus(false)
    }
    
  }

  const handleSetMatch = (match:RaceType,playerA:RacerType|undefined,playerB:RacerType|undefined ) => {
    if(match&&playerA&&playerB){
      const datas = {
        ...match,
        runnerA:playerA,
        runnerB:playerB
      }
      setupMatch(datas)
      navigate('/match')
    }
  }

  useEffect(() => {
    getTournament()
  }, []);


  return (
    <div className="keys_container">
      {!!viewPlayerData ?
        <ModalJogador
        open={!!viewPlayerData}
        close={() => setViewPlayerData('')}
        player={viewPlayerData}
      />:<></>}
      <Alert open={!!messageStatus} close={()=>setMessageStatus('')} message={messageStatus}/>
      <Backdrop open={backdropStatus}/>
      {tournament?
      tournament.graph.map( (race,index) => {
        if(!index) return <></>
        return (
          <div key={index+'-'+tournament.category} className="key_tournament">
            <div  className="key_tournament_index">
              {race.map((match, indexMatch)=>{
                const matchData = races[index]
                const playerA = players.find(player=>matchData[indexMatch].runnerA===player.id)
                const playerB = players.find(player=>matchData[indexMatch].runnerB===player.id)
                const done = !!matchData[indexMatch].winner
                return (
                  <div key={indexMatch+'-'+tournament.category} className={done?"key_card_tournament done":"key_card_tournament"}>
                    <h3>{indexMatch+1}</h3>
                    <div  className="key_tournament_index">
                      <div 
                        className={matchData[indexMatch].winner===playerA?.id?"card winner clicable":done?"card":"card clicable"}
                        onClick={()=>setViewPlayerData(playerA||"")}
                        >{playerA?.name}
                      </div>
                      <div 
                        className={matchData[indexMatch].winner===playerB?.id?"card winner clicable":done?"card":"card clicable"}
                        onClick={()=>setViewPlayerData(playerB||"")}
                        >{playerB?.name}
                      </div>
                    </div>
                    <div className={done?"card":"card clicable"} onClick={()=>handleSetMatch(matchData[indexMatch],playerA,playerB)}><Play/></div>
                  </div>
                )
              })}
            </div>
          </div>)
        })
      :
      <></>
      }
    </div>
  );
}

export default Tournament;
