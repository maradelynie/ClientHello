import { createContext, useContext, useState } from "react";
import { MatchType, RacerType, TournamentType } from "../types/useMatch";

type MatchProps = {
  children: JSX.Element;
};

type UseMatchProps = {
  match: MatchType | false;
  setupMatch: (match: MatchType) => void;
  tournament: TournamentType | false;
  setupTournament: (match: TournamentType) => void;
  players: RacerType[] | [];
  setupPlayers: (racers: RacerType[]) => void;
};

const MatchContext = createContext<UseMatchProps>({
  match: false,
  setupMatch: (match: MatchType) => {
    return;
  },
  tournament: false,
  setupTournament: (match: TournamentType) => {
    return;
  },
  players: [],
  setupPlayers: (racers: RacerType[]) => {
    return;
  },
});

const MatchProvider = ({ children }: MatchProps) => {
  const [tournament, setTournament] = useState<TournamentType | false>(false);
  const [match, setMatch] = useState<MatchType | false>(false);
  const [players, setPlayers] = useState<RacerType[] | []>([]);

  const setupMatch = (value: MatchType) => {
    setMatch(value || false);
    return;
  };
  const setupPlayers = (value: RacerType[]) => {
    setPlayers(value || []);
    return;
  };
  const setupTournament = (value: TournamentType) => {
    setTournament(value || false);
    return;
  };

  return (
    <MatchContext.Provider
      value={{
        match,
        setupMatch,
        players,
        setupPlayers,
        tournament,
        setupTournament,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

function useMatch() {
  const context = useContext(MatchContext);

  return context;
}

export { MatchProvider, useMatch };
