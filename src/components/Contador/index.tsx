import { useEffect, useState } from "react";
import ModalWin from "../ModalWin";
import "./style.scss";
type RacerType = {
  id: string | null;
  name: string;
  average_speed: number;
  wos: number;
  times_played: number;
  victories: number;
  category: string;
  tournament?: string;
  dead: boolean;
  key?: string;
};
type ContadorType = {
  p1: RacerType;
  p2: RacerType;
  p1Pulse: number;
  p2Pulse: number;
  actualTime: number;
  quickPlayMode: boolean;
  handleRestart: () => void;
  setStartTimer: (status: boolean) => void;
  handleFinishMatch: (p1: RacerType, p2: RacerType, winner: string) => void;
};
const TIRESIZE = process.env.REACT_APP_TIRESIZE || 2096;

const TOTALDIST = Number(process.env.REACT_APP_TOTALDIST || 500);

function Contador({
  p1,
  p2,
  p1Pulse,
  p2Pulse,
  setStartTimer,
  quickPlayMode,
  actualTime,
  handleRestart,
  handleFinishMatch,
}: ContadorType) {
  const [meterP1, setMeterP1] = useState(0);
  const [meterP2, setMeterP2] = useState(0);
  const [speedP1, setSpeedP1] = useState(0);
  const [speedP2, setSpeedP2] = useState(0);
  const [p1Winning, setP1Winning] = useState(false);

  const [winner, setWinner] = useState<RacerType | "">("");
  const [winnerSpeed, setWinnerSpeed] = useState(0);

  const showDistance = (pulse: number) => {
    const meter = (pulse * Number(TIRESIZE)) / 1000;
    return Math.round(meter);
  };
  const showPercentage = (total: number, actual: number) => {
    const percentage = (actual * 100) / total;
    return percentage;
  };
  const showSpeed = (pulse: number) => {
    const dist = showDistance(pulse) / 1000;
    const hour = actualTime / 3600000;
    return Math.round(dist / hour || 0.001);
  };
  const startWin = (player: RacerType) => {
    setWinner(player);
    setStartTimer(false);
  };
  const closeWinner = () => {
    setWinner("");
  };
  const handleSave = () => {
    if (winner) {
      const newPlayerA = {
        ...p1,
        id: null,
        times_played: p1.times_played + 1,
        average_speed: p1.average_speed > speedP1 ? p1.average_speed : speedP1,
        victories: p1.key === winner.key ? p1.victories + 1 : p1.victories,
        dead: p1.key === winner.id ? false : true,
      };
      const newPlayerB = {
        ...p2,
        id: null,
        times_played: p2.times_played + 1,
        average_speed: p2.average_speed > speedP2 ? p2.average_speed : speedP2,
        victories: p2.key === winner.key ? p2.victories + 1 : p2.victories,
        dead: p2.key === winner.key ? false : true,
      };
      handleFinishMatch(newPlayerA, newPlayerB, winner.key || "");
    }
  };

  useEffect(() => {
    const p1Distance = showDistance(p1Pulse);
    const p2Distance = showDistance(p2Pulse);
    const p1Speed = showSpeed(p1Pulse);
    const p2Speed = showSpeed(p2Pulse);

    if (p1Distance > p2Distance) {
      setP1Winning(true);
    } else setP1Winning(false);

    if (p1Distance >= TOTALDIST) {
      setWinnerSpeed(p1Speed);
      return startWin(p1);
    } else if (p2Distance >= TOTALDIST) {
      setWinnerSpeed(p2Speed);
      return startWin(p2);
    } else if (actualTime) {
      setSpeedP1(p1Speed);
      setSpeedP2(p2Speed);
      setMeterP1(p1Distance);
      setMeterP2(p2Distance);
    } else {
      setSpeedP1(0);
      setSpeedP2(0);
      setMeterP1(0);
      setMeterP2(0);
    }
  }, [p1Pulse, p2Pulse, actualTime]);

  return (
    <div className="contador-container">
      <ModalWin
        quickPlayMode={quickPlayMode}
        player={winner}
        winnerSpeed={winnerSpeed}
        open={!!winner}
        close={closeWinner}
        actualTime={actualTime}
        handleSave={handleSave}
        handleRestart={handleRestart}
      />
      {p1 && p2 ? (
        <>
          <section className="contador-p1">
            <main>
              <div
                className="contador-bar"
                style={{ height: `${showPercentage(100, speedP1)}%` }}
              >
                {speedP1}km/h
              </div>
              <div
                className={
                  p1Winning
                    ? "contador-bar distance front"
                    : "contador-bar distance"
                }
                style={{ height: `${showPercentage(TOTALDIST, meterP1)}%` }}
              >
                {meterP1}m
              </div>
            </main>
            <div className="contador-nome">{p1.name}</div>
          </section>

          <section className="contador-p2">
            <main>
              <div
                className="contador-bar distance"
                style={{ height: `${showPercentage(TOTALDIST, meterP2)}%` }}
              >
                {meterP2}m
              </div>
              <div
                className="contador-bar"
                style={{ height: `${showPercentage(100, speedP2)}%` }}
              >
                {speedP2}km/h
              </div>
            </main>
            <div className="contador-nome">{p2.name}</div>
          </section>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Contador;
