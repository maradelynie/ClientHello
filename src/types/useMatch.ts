export type MatchType = {
  id: string;
  category: string;
  runnerA: RacerType;
  runnerB: RacerType | false;
  tournament: string;
  winner: string;
};
export type RacerType = {
  id: string | null;
  name: string;
  average_speed: number;
  wos: number;
  times_played: number;
  victories: number;
  category: string;
  tournament?: string | undefined;
  dead: boolean;
  key?: string | undefined;
};
export type TournamentType = {
  id: number;
  name: string;
  date: string;
  racers: RacerType[];
};
export type KeysType = {
  category: string;
  current_race: string;
  current_round: string;
  graph: MatchType[][];
  tournament: string;
};
