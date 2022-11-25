import "./style.scss";
import { useEffect, useState } from "react";
import * as api from '../../sevices'
import ModalCadastroTorneio from "../../components/ModalCadastroTorneio";
import { Edit } from 'react-feather';
import { useNavigate } from "react-router-dom";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";

type TournamentType = {
  id: number, title: string, createdAt: string
}

function Load() {
  const navigate = useNavigate();
  const [backdropStatus, setBackdropStatus] = useState(true);
  const [AlertMessage, setMessageStatus] = useState('');
  const [modalCadastroTorneio, setModalCadastroTorneio] = useState(false);
  const [search, setSearch] = useState('');
  const [tournaments, setTournaments] = useState<TournamentType[]>([]);
  const [tournamentsToShow, setTournamentsToShow] = useState<TournamentType[]>([]);

  const getTournaments = async () => {
    try{
      setBackdropStatus(true)
      const tournaments = await api.getTorunaments()
      setTournaments(tournaments)
      setTournamentsToShow(tournaments)
      setSearch('')
    }catch{
      setMessageStatus("Erro ao carregar torneios")
    }finally{
      setBackdropStatus(false)
    }
    
  }
  const handleSearch = (term:string) => {
    setTournamentsToShow( tournaments.filter(tournament=>tournament.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
    )
    setSearch(term)
  }

  useEffect(() => {
    getTournaments()
  }, []);

  return (
    <div className="home_container">
      <Backdrop open={backdropStatus}/>
      <Alert open={!!AlertMessage} close={()=>setMessageStatus('')} message={AlertMessage}/>
      <header>
        <input type="search" value={search} onChange={e=>handleSearch(e.target.value)} placeholder='Pesquisar' />
      </header>
          <section>
            {tournamentsToShow.map(tournament=>{
              return <div key={tournament.id} className="button load-tournament" onClick={()=>navigate('/tournament/'+tournament.id)}><h3>{tournament.title}</h3><span>{new Date(tournament.createdAt).toLocaleDateString()}</span></div>
            })}
          </section>
          {modalCadastroTorneio ?
          <ModalCadastroTorneio
          setBackdropStatus={setBackdropStatus}
          open={modalCadastroTorneio}
          close={() => setModalCadastroTorneio(false)}
          setMessageStatus={setMessageStatus}
        />:''}
        
    </div>
  );
}

export default Load;
