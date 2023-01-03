import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Alert from '../../components/alert'
import Backdrop from '../../components/backdrop'
import ModalCadastroTorneio from '../../components/ModalCadastroTorneio'
import { useUser } from '../../hooks/useUser'
import './style.scss'

function Home() {
  const navigate = useNavigate()
  const { logout } = useUser()
  const [backdropStatus] = useState(false)
  const [AlertMessage, setMessageStatus] = useState('')
  const [modalCadastroTorneio, setModalCadastroTorneio] = useState(false)

  return (
    <div className="home_container">
      <Backdrop open={backdropStatus} />
      <Alert
        open={!!AlertMessage}
        close={() => setMessageStatus('')}
        message={AlertMessage}
      />
      <button type="button" onClick={() => navigate('/load')}>
        Carregar jogo
      </button>
      <button type="button" onClick={() => setModalCadastroTorneio(true)}>
        Novo Jogo
      </button>
      <button type="button" onClick={() => navigate('/match/quickplay')}>
        Jogo Rápido
      </button>
      <button type="button" onClick={logout}>
        Sair
      </button>
      {modalCadastroTorneio ? (
        <ModalCadastroTorneio
          open={modalCadastroTorneio}
          close={() => setModalCadastroTorneio(false)}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default Home
