import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import p1 from './../../assets/p12.png'
import p2 from './../../assets/p22.png'

function Background() {
  const [status, setStatus] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.toLocaleLowerCase().includes('match')) {
      setStatus(true)
    } else {
      setStatus(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <span
        className={
          !status
            ? 'home-background-players'
            : 'home-background-players background-move'
        }
      >
        <img alt="imagem player 1" className="p1animation" src={p1} />
        <img alt="imagem player 2" className="p2animation" src={p2} />
      </span>
      <div className="home-background-flickerneon"></div>
    </>
  )
}

export default Background
