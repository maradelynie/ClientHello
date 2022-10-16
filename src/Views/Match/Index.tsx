import "./style.scss";
import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import Contador from "../../components/Contador";
import { useEffect, useState } from "react";
import ModalCadastro from "../../components/ModalCadastro/index";
import ModalCount from "../../components/ModalCount/index";
import { io } from "socket.io-client";

const APIURLSOCKET =
  process.env.REACT_APP_APIURLSOCKET || "http://localhost:3008";

function Home() {
  const [modalCadastro, setModalCadastro] = useState(false);
  const [p1Name, setP1Name] = useState("");
  const [p1Pulse, setP1Pulse] = useState(0);
  const [p2Name, setP2Name] = useState("");
  const [p2Pulse, setP2Pulse] = useState(0);
  const [ready, setReady] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [showCountDown, setShowCountDown] = useState(false);

  const [startTimer, setStartTimer] = useState(false);
  const [actualTime, setActualTime] = useState<number>(0);

  const handleRestart = () => {
    setP2Pulse(0)
    setP1Pulse(0)
    setActualTime(0);
    setStartTimer(false);
    setReady(false);
    setP1Name("");
    setP2Name("");

  };

  const startCountDown = async () =>
    await new Promise<void>((resolve, reject) => {
      const count = setInterval(() => {
        setCountDown((actual) => {
          const newValue = actual - 1;
          if (newValue === 0) {
            clearInterval(count);
            resolve();
            setShowCountDown(false);

            return 3;
          }
          return newValue;
        });
      }, 1000);
    });

  const handleStart = async () => {
    setShowCountDown(true);

    await startCountDown();
    startGame();
  };

  const startGame = () => {
    setStartTimer(true);
    setReady(true);
  };

  const showTimer = (time: number) => {
    return (
      <>
        <span className="digits">
          {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits"> 
          {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {("0" + ((time / 10) % 100)).slice(-2)}
        </span>
      </>
    );
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    interval = setInterval(() => {
      if (startTimer) {
        setActualTime((time) => {
          return time + 10;
        });
      } else {
        clearInterval(interval);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [startTimer]);

  useEffect(() => {
    if (startTimer) {
      const socket = io(APIURLSOCKET, { transports: ["websocket", "polling"] });

      socket.on("data", (data) => {
        console.log(data)
        if(startTimer){
          if(data.includes('P2')){
            setP1Pulse(pulse=>pulse+1)
          }else if(data.includes('P1')){
            setP2Pulse(pulse=>pulse+1)
          }
        }
      });

      return () => {
        socket.off("data", (data) => {
          console.log(data);
        });
        socket.close();
      };
    }
  }, [startTimer]);

  return (
    <>
      <span className="home-background-players">
        <img alt="imagem player 1" className="p1animation" src={p1} />
        <img alt="imagem player 2" className="p2animation" src={p2} />
      </span>
      <div className="home-container">
        <section>
          <h1>Hell.O</h1>
          <Contador p1={p1Name} p2={p2Name} p1Pulse={p1Pulse} p2Pulse={p2Pulse} handleRestart={handleRestart} setStartTimer={setStartTimer} actualTime={actualTime}/>
          <h3>{showTimer(actualTime)}</h3>
          {ready || showCountDown ? (
            <>
              <button onClick={() => handleRestart()}>Reiniciar</button>
            </>
          ) : (
            <button onClick={() => setModalCadastro(true)}>Nova Partida</button>
          )}
        </section>
        <ModalCount open={showCountDown} countDown={countDown} />
        <ModalCadastro
          open={modalCadastro}
          close={() => setModalCadastro(false)}
          setP1Name={setP1Name}
          setP2Name={setP2Name}
          handleStart={handleStart}
        />
      </div>
    </>
  );
}

export default Home;
