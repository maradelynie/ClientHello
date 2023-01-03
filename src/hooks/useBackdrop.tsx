import { createContext, useContext, useState } from 'react'

import Backdrop from '../components/backdrop'

type BackdropProps = {
  children: JSX.Element
}

type UseBackdropProps = {
  setupOpen: () => void
  setupClose: () => void
}

const BackdropContext = createContext<UseBackdropProps>({
  setupOpen: () => {
    return
  },
  setupClose: () => {
    return
  }
})

const BackdropProvider = ({ children }: BackdropProps) => {
  const [status, setStatus] = useState<boolean>(false)

  const setupOpen = () => {
    setStatus(true)
  }
  const setupClose = () => {
    setStatus(false)
  }

  return (
    <BackdropContext.Provider
      value={{
        setupOpen,
        setupClose
      }}
    >
      <Backdrop open={status} />
      {children}
    </BackdropContext.Provider>
  )
}

function useBackdrop() {
  const context = useContext(BackdropContext)
  return context
}

export { BackdropProvider, useBackdrop }
