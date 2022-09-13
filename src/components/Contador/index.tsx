import {useEffect,useState} from 'react'
import ModalWin from '../ModalWin';
import './style.scss'
type ContadorType = {
  p1: string,
  p2: string,
  p1Pulse: number,
  p2Pulse: number,
  actualTime: number,
  handleRestart: ()=>void,
  setStartTimer: (status:boolean)=>void
}
const TIRESIZE =
  process.env.REACT_APP_TIRESIZE || 2096;

  const TOTALDIST =
  Number(process.env.REACT_APP_TOTALDIST || 500)


function Contador({p1, p2, p1Pulse, p2Pulse, handleRestart, setStartTimer, actualTime}:ContadorType) {
  const [meterP1, setMeterP1] = useState(0)
  const [meterP2, setMeterP2] = useState(0)
  const [speedP1, setSpeedP1] = useState(0)
  const [speedP2, setSpeedP2] = useState(0)

  const [winner, setWinner] = useState('')

  const showDistance = (pulse:number) => {
    const meter = (pulse*Number(TIRESIZE))/1000
    return Math.round(meter)
  }
  const showPercentage = (total:number, actual:number) => {
    const percentage = actual*100/total
    return percentage
  }
  const showSpeed = (pulse:number) => {
    const dist = showDistance(pulse)/1000
    const hour = actualTime/3600000
    return Math.round(dist/hour||0.001)
  }

  const startWin = (player:string) => {
    setWinner(player)
    setStartTimer(false)
  }
  const closeWinner = () => {
    setWinner('')
    handleRestart()
  }
  useEffect(() => {
    const p1Distance = showDistance(p1Pulse)
    const p2Distance = showDistance(p2Pulse)
    const p1Speed = showSpeed(p1Pulse)
    const p2Speed = showSpeed(p2Pulse)
    
    if(p1Distance>=TOTALDIST){
      return startWin(p1)
    }else if (p2Distance>=TOTALDIST){
      return startWin(p2)
    }else if(actualTime){
      setSpeedP1(p1Speed)
      setSpeedP2(p2Speed)
      setMeterP1(p1Distance)
      setMeterP2(p2Distance)
    }else{
      setSpeedP1(0)
      setSpeedP2(0)
      setMeterP1(0)
      setMeterP2(0)
    }
  }, [p1Pulse,p2Pulse, actualTime])
  


  return (
    <div className="contador-container">
      <ModalWin player={winner} open={!!winner} close={closeWinner}/>
      {p1 && p2 ?
        <>
          <section className="contador-p1">
            <main>
              <div style={{height:`${showPercentage(100,speedP1)}%`}}>
                {speedP1}km/h
              </div>
              <div style={{height:`${showPercentage(TOTALDIST,meterP1)}%`}}>
                {meterP1}m
              </div>
            </main>
            <div className='contador-nome'>
              {p1}
            </div>
          </section>

          <section className="contador-p1">
            <main>
              <div style={{height:`${showPercentage(TOTALDIST,meterP2)}%`}}>
                {meterP2}m
              </div>
              <div style={{height:`${showPercentage(100,speedP2)}%`}}>
                {speedP2}km/h
              </div>

            </main>
            <div className='contador-nome'>
              {p2}
            </div>
          </section>
        </>
      :
        <></>
      }
    </div>
  );
}

export default Contador;
