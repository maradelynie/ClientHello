import "./style.scss";
import React, { useEffect, useState } from "react";
import * as api from "../../sevices";
import { Play } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import ModalJogador from "../../components/ModalJogador";
import Backdrop from "../../components/backdrop";
import Alert from "../../components/alert";
import { useMatch } from "../../hooks/useMatch";
import { KeysType, MatchType, RacerType } from "../../types/useMatch";

type rawTournamentType = {
  category: string;
  current_race: string;
  current_round: string;
  graph: string[][];
  tournament: string;
};

type RawMatchType = {
  id: string;
  category: string;
  runnerA: string;
  runnerB: string;
  tournament: string;
  winner: string;
};

type ParamsType = {
  id: string;
  category: string;
};

function Tournament() {
  const { id, category } = useParams<ParamsType>();
  const pa = useParams<ParamsType>();
  const { setupMatch, players } = useMatch();
  const navigate = useNavigate();
  const [backdropStatus, setBackdropStatus] = useState(true);
  const [keys, setKeys] = useState<KeysType>();
  const [messageStatus, setMessageStatus] = useState("");
  const [viewPlayerData, setViewPlayerData] = useState<RacerType | false>(
    false
  );

  const getTournament = async () => {
    try {
      setBackdropStatus(true);
      const tournamentKeys: rawTournamentType = await getTournamentData();
      const allRaces: MatchType[][] = await getRacesData(tournamentKeys);
      setKeys({ ...tournamentKeys, graph: allRaces });
    } catch {
      setMessageStatus("Erro ao carregar chaves");
    } finally {
      setBackdropStatus(false);
    }
  };

  const getTournamentData = async () =>
    await new Promise<rawTournamentType>(async (resolve, reject) => {
      const tournamentKeys = await api.getTournamentKeys(
        id || "",
        category || ""
      );
      if (!tournamentKeys.graph[1][0]) {
        await api.createTournamentKeys(id || "", category || "");
        resolve(await api.getTournamentKeys(id || "", category || ""));
      } else if (
        players
          .filter((player) => !player.dead)
          .filter((player) => player.category === category).length > 1
      ) {
        try {
          resolve(await api.updateTournamentKeys(id || "", category || ""));
        } catch {
          console.error("not over yet");
        }
      }

      resolve(tournamentKeys);
    });

  const getRacesData = async (tournamentKeys: rawTournamentType) =>
    await new Promise<MatchType[][]>(async (resolve, reject) => {
      const filteredData = tournamentKeys.graph.filter(
        (races) => races[0] !== ""
      );
      const raceData = await Promise.all(
        filteredData.map(async (races: string[]) => {
          return await Promise.all(
            races.map(async (race: string) => {
              const dados = await api.getRace(race || "", id || "");
              return { ...dados, id: race };
            })
          );
        })
      );

      const playersData: MatchType[][] = raceData.map(
        (races: RawMatchType[]) => {
          return races.map((race) => {
            const playerA = players.find(
              (player) => player.key === race.runnerA
            );
            const playerB = players.find(
              (player) => player.key === race.runnerB
            );

            if (!playerA) throw Error();
            return {
              ...race,
              runnerA: playerA,
              runnerB: playerB || false,
            };
          });
        }
      );

      resolve(playersData);
    });

  const handleSetMatch = (match: MatchType) => {
    if (match) {
      setupMatch(match);
      navigate("/match");
    }
  };

  useEffect(() => {
    if (!players.length) {
      navigate("/tournament/" + id);
    } else if (id && category) getTournament();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="keys_container">
      {!!viewPlayerData ? (
        <ModalJogador
          open={!!viewPlayerData}
          close={() => setViewPlayerData(false)}
          player={viewPlayerData}
        />
      ) : (
        <></>
      )}
      <Alert
        open={!!messageStatus}
        close={() => setMessageStatus("")}
        message={messageStatus}
      />
      <Backdrop open={backdropStatus} />
      {keys ? (
        keys.graph.map((race, index) => {
          return (
            <div key={index + "-" + keys.category} className="key_tournament">
              <div className="key_tournament_index">
                {race.map((match, indexMatch) => {
                  const done = match.winner;
                  return (
                    <div
                      key={indexMatch + "-" + keys.category}
                      className={
                        done
                          ? "key_card_tournament done"
                          : "key_card_tournament"
                      }
                    >
                      <h3>{indexMatch + 1}</h3>
                      <div className="key_tournament_index">
                        <div
                          className={
                            match.winner === match.runnerA.key
                              ? "card winner clicable"
                              : done
                              ? "card"
                              : "card clicable"
                          }
                          onClick={() => setViewPlayerData(match.runnerA || "")}
                        >
                          {match.runnerA.name}
                        </div>
                        <div
                          className={
                            match.runnerB && match.winner === match.runnerB.key
                              ? "card winner clicable"
                              : done
                              ? "card"
                              : "card clicable"
                          }
                          onClick={() =>
                            match.runnerB
                              ? setViewPlayerData(match.runnerB)
                              : false
                          }
                        >
                          {match.runnerB ? match.runnerB.name : "-"}
                        </div>
                      </div>
                      <div
                        className={done ? "button unClicable" : "button"}
                        onClick={() => handleSetMatch(match)}
                      >
                        <Play />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tournament;
