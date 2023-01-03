import './style.scss'

import * as api from '../../sevices'
import Contador from '../../components/Contador'
import { useEffect, useState } from 'react'
import ModalStart from '../../components/ModalStart/index'
import ModalCount from '../../components/ModalCount/index'
import { io } from 'socket.io-client'
import { useMatch } from '../../hooks/useMatch'
import { useLocation, useNavigate } from 'react-router-dom'
import Backdrop from '../../components/backdrop'
import Alert from '../../components/alert'
import { RacerType } from '../../types/useMatch'

const APIURLSOCKET =
  process.env.REACT_APP_APIURLSOCKET || 'http://localhost:3008'

function Home() {
  const [modalStart, setModalStart] = useState(false)
  const [backdropStatus, setBackdropStatus] = useState(false)
  const [messageStatus, setMessageStatus] = useState('')
  const { match, setupPlayers, players } = useMatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [playerA, setPlayerA] = useState<RacerType | false>(false)
  const [p1Pulse, setP1Pulse] = useState(0)
  const [playerB, setPlayerB] = useState<RacerType | false>(false)
  const [p2Pulse, setP2Pulse] = useState(0)
  const [countDown, setCountDown] = useState(3)
  const [showCountDown, setShowCountDown] = useState(false)

  const [startTimer, setStartTimer] = useState(false)
  const [actualTime, setActualTime] = useState<number>(0)

  const [quickPlayMode, setQuickPlayMode] = useState(false)

  const handleRestart = () => {
    setP2Pulse(0)
    setP1Pulse(0)
    setActualTime(0)
    setStartTimer(false)
    setModalStart(true)
  }
  const handleCancelStart = () => {
    navigate(-1)
  }
  const handleInvert = () => {
    if (playerB && playerA) {
      const newPlayerA = { ...playerB }
      const newPlayerB = { ...playerA }

      setPlayerA(newPlayerA)
      setPlayerB(newPlayerB)
    }
  }
  const startCountDown = async () =>
    await new Promise<void>((resolve, reject) => {
      const count = setInterval(() => {
        setCountDown(actual => {
          const newValue = actual - 1
          if (newValue === 0) {
            clearInterval(count)
            resolve()
            setShowCountDown(false)

            return 3
          }
          return newValue
        })
      }, 1000)
    })
  const handleStart = async () => {
    setModalStart(false)
    setShowCountDown(true)

    await startCountDown()
    startGame()
  }
  const startGame = () => {
    setStartTimer(true)
  }
  const showTimer = (time: number) => {
    return (
      <>
        <span className="digits">
          {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}.
        </span>
        <span className="digits mili-sec">
          {('0' + ((time / 10) % 100)).slice(-2)}
        </span>
      </>
    )
  }
  const handleFinishMatch = async (
    playerA: RacerType,
    playerB: RacerType,
    winner: string
  ) => {
    try {
      setBackdropStatus(true)
      if (match) {
        const raceData = {
          key: match.id,
          winner,
          runnerA: playerA.key,
          runnerB: playerB.key,
          category: match.category
        }
        await api.putPlayers([playerA, playerB], match.tournament)
        await api.putRace(raceData, match.tournament)

        const newPlayers = players.map(player => {
          if (player.key === playerA.key) return playerA
          else if (player.key === playerB.key) return playerB
          return player
        })

        setupPlayers(newPlayers)
        navigate(-1)
      }
    } catch {
      setMessageStatus('Erro ao carregar chaves')
    } finally {
      setBackdropStatus(false)
    }
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> = setInterval(() => null)
    interval = setInterval(() => {
      if (startTimer) {
        setActualTime(time => {
          return time + 10
        })
      } else {
        clearInterval(interval)
      }
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [startTimer])

  useEffect(() => {
    if (startTimer) {
      const socket = io(APIURLSOCKET, { transports: ['websocket', 'polling'] })

      socket.on('data', data => {
        if (startTimer) {
          if (data.includes('P2')) {
            setP1Pulse(pulse => pulse + 1)
          } else if (data.includes('P1')) {
            setP2Pulse(pulse => pulse + 1)
          }
        }
      })

      return () => {
        socket.off('data', data => {
          console.log(data)
        })
        socket.close()
      }
    }
  }, [startTimer])

  useEffect(() => {
    if (pathname.toLocaleLowerCase().includes('quickplay')) {
      const defaultPlayer = {
        id: null,
        average_speed: 0,
        wos: 0,
        times_played: 0,
        victories: 0,
        category: 'sem',
        tournament: '0',
        dead: false
      }
      setQuickPlayMode(true)
      setPlayerA({ ...defaultPlayer, name: 'Player 1' })
      setPlayerB({ ...defaultPlayer, name: 'Player 2' })
    } else if (match) {
      setPlayerA(match.runnerA)
      setPlayerB(match.runnerB)
      setModalStart(true)
    } else navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="match-container">
      <Alert
        open={!!messageStatus}
        close={() => setMessageStatus('')}
        message={messageStatus}
      />
      <Backdrop open={backdropStatus} />

      <section className="home-container">
        {playerA && playerB && (
          <Contador
            handleFinishMatch={handleFinishMatch}
            p1={playerA}
            p2={playerB}
            p1Pulse={p1Pulse}
            p2Pulse={p2Pulse}
            setStartTimer={setStartTimer}
            handleRestart={handleRestart}
            actualTime={actualTime}
            quickPlayMode={quickPlayMode}
          />
        )}
        <h3>{showTimer(actualTime)}</h3>

        {quickPlayMode && !actualTime ? (
          <button type="button" onClick={() => setModalStart(true)}>
            Iniciar
          </button>
        ) : (
          <button type="button" className="danger" onClick={handleRestart}>
            Reiniciar
          </button>
        )}
      </section>
      <ModalCount open={showCountDown} countDown={countDown} />
      <ModalStart
        open={modalStart}
        close={handleCancelStart}
        handleStart={handleStart}
        invert={handleInvert}
      />
    </div>
  )
}

export default Home
