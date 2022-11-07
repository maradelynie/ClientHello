import "./style.scss";
import React, { useEffect, useState } from "react";
import * as api from '../../sevices'
import { Edit, Frown, Play,Trash,UserPlus } from 'react-feather';
import { useNavigate, useParams } from "react-router-dom";
import ModalCadastroJogador from "../../components/ModalCadastroJogador";
import ModalJogador from "../../components/ModalJogador";
import ModalDeleteJogador from "../../components/ModalDeleteJogador";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";
import ModalDeleteTournament from "../../components/ModalDeleteTournament";
import { useMatch } from "../../hooks/useMatch";

type TournamentType = {
  id: number, name: string, date: string, racers: ReacersType[]
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

function Tournament() {
  const {id} = useParams()
  const navigate = useNavigate();
  const {setupPlayers} = useMatch()
  const [backdropStatus, setBackdropStatus] = useState(true);
  const [tournament, setTournament] = useState<TournamentType|''>('');
  const [semPlayers, setSemPlayers] = useState<ReacersType[]|[]>([]);
  const [femPlayers, setFemPlayers] = useState<ReacersType[]|[]>([]);
  const [masPlayers, setMascPlayers] = useState<ReacersType[]|[]>([]);
  const [viewPlayerData, setViewPlayerData] = useState<ReacersType|''>('');
  const [editPlayerData, setEditPlayerData] = useState<ReacersType|''>('');
  const [deletePlayerData, setDeletePlayerData] = useState<ReacersType|''>('');
  const [modalCadastroJogador, setModalCadastroJogador] = useState(false);
  const [modalDeleteTournament, setModalDeleteTournament] = useState(false);
  const [messageStatus, setMessageStatus] = useState('');
  
  const getTournament = async () => {
    try{
    setBackdropStatus(true)
    const tournament = await api.getTorunament(id||'')
    setTournament(tournament)
    setupPlayers(tournament.racers)
    setSemPlayers(tournament.racers.filter((player:ReacersType)=>player.category==='sem'))
    setFemPlayers(tournament.racers.filter((player:ReacersType)=>player.category==='fem'))
    setMascPlayers(tournament.racers.filter((player:ReacersType)=>player.category==='mas'))
  }catch{
    setMessageStatus("Erro ao carregar torneios")
  }finally{
    setBackdropStatus(false)
  }
    
  }
  const handleGotToTOurnament = async (category:string, players:ReacersType[]) =>{
    if(players.length>1){
      try{
        setBackdropStatus(true)
        await api.createTournamentKeys(id||'',category )
        navigate(`/keys/${category}/${id}`)
      }catch{
        setMessageStatus("Erro ao carregar torneio")
      }finally{
        setBackdropStatus(false)
      }
    }else setMessageStatus("Adicione mais jogadores ao torneio")
  }

  const handleEdit = (e:React.MouseEvent<SVGElement, MouseEvent>,player:ReacersType) => {
    e.stopPropagation()
    setEditPlayerData(player)
  }
  const handleDelete = (e:React.MouseEvent<SVGElement, MouseEvent>,player:ReacersType) => {
    e.stopPropagation()
    setDeletePlayerData(player)
  }
  const handleDeleteTournament = async () => {
    try{
      setBackdropStatus(true)
      await api.deletTorunaments(id||'')
      navigate('/')
    }catch{
      setMessageStatus("Erro ao deletar torneios")
    }finally{
      setBackdropStatus(false)
    }
  }
  useEffect(() => {
    getTournament()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="tournament_container">
      <Alert open={!!messageStatus} close={()=>setMessageStatus('')} message={messageStatus}/>
      <Backdrop open={backdropStatus}/>
      {tournament?
      <>
       {!!modalDeleteTournament ?
          <ModalDeleteTournament
          open={modalDeleteTournament}
          close={() => setModalDeleteTournament(false)}
          handleDeleteTournament={handleDeleteTournament}
        />:<></>}
      {!!deletePlayerData ?
          <ModalDeleteJogador
          open={!!deletePlayerData}
          close={() => setDeletePlayerData('')}
          player={deletePlayerData}
          getTournament={getTournament}
          setBackdropStatus={setBackdropStatus}
          setMessageStatus={setMessageStatus}
        />:<></>}
      {!!editPlayerData ?
          <ModalJogador
          open={!!editPlayerData}
          close={() => setEditPlayerData('')}
          player={editPlayerData}
          edit={true}
          getTournament={getTournament}
          setBackdropStatus={setBackdropStatus}
          setMessageStatus={setMessageStatus}
          />:<></>}
      {!!viewPlayerData ?
          <ModalJogador
          open={!!viewPlayerData}
          close={() => setViewPlayerData('')}
          player={viewPlayerData}
        />:<></>}
      {modalCadastroJogador ?
          <ModalCadastroJogador
          open={modalCadastroJogador}
          close={() => setModalCadastroJogador(false)}
          tournamentId={id||''}
          setBackdropStatus={setBackdropStatus}
          getTournament={getTournament}
          setMessageStatus={setMessageStatus}
          />:<></>}
      <header>
        <section className="small">
          <h2>{tournament.name}</h2>
          <span>{new Date(tournament.date).toLocaleDateString()}</span>
        </section>
        <nav>
        <div onClick={()=>setModalCadastroJogador(true)}  className="button"><UserPlus color='black'/></div>
        <div onClick={()=>setModalDeleteTournament(true)}  className="button danger"><Trash color='black'/></div>
          
        </nav>
      </header>
      <main>
      {tournament.racers?<>
      <ul className="card">
        <header><h3>Sem gênero</h3><div onClick={()=>handleGotToTOurnament('sem',semPlayers)} className={semPlayers.length>1?"icon clicable":"icon unClicable"}><Play/></div></header>
          {semPlayers.map(player=>{
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5><div>{player.dead?<Frown size={14}/>:''} {player.name}</div> <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
        <ul className="card">
        <header><h3>Feminino</h3><div onClick={()=>handleGotToTOurnament('fem',femPlayers)} className={femPlayers.length>1?"icon clicable":"icon unClicable"}><Play/></div></header>
          {femPlayers.map(player=>{
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5><div>{player.dead?<Frown size={14}/>:''} {player.name}</div> <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
        <ul className="card">
        <header><h3>Masculino</h3><div onClick={()=>handleGotToTOurnament('mas',masPlayers)} className={masPlayers.length>1?"icon clicable":"icon unClicable"}><Play/></div></header>
          {masPlayers.map(player=>{
            return <li key={player.key} onClick={()=>setViewPlayerData(player)}><h5><div>{player.dead?<Frown size={14}/>:''} {player.name}</div> <nav><Trash  onClick={(e)=>handleDelete(e,player)} className="icon"/> <Edit onClick={(e)=>handleEdit(e,player)}className="icon" /></nav></h5><hr></hr></li>
          })}
        </ul>
      </>:<></>}
        
      </main>
      </>:<></>
      }
      
        
    </div>
  );
}

export default Tournament;
