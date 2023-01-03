import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import './style.scss'

function Header() {
  const [loged, setLoged] = useState(false)
  const { getToken, user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!getToken()) {
      navigate('/login')
      setLoged(false)
    } else setLoged(true)
  }, [user])

  return (
    <header className="header_title_h1">
      {loged ? (
        <button type="button" onClick={() => navigate(-1)}>
          <ChevronLeft size={32} className="clicable" />
        </button>
      ) : (
        <></>
      )}
      <h1>Hell.0</h1>
      {loged ? (
        <button type="button" onClick={() => navigate(1)}>
          <ChevronRight size={32} className="clicable" />
        </button>
      ) : (
        <></>
      )}
    </header>
  )
}

export default Header
