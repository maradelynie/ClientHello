import { createContext, useContext, useState } from 'react'

import Alert from '../components/alert'

type AlertProps = {
  children: JSX.Element
}

type UseAlertProps = {
  setupMessage: (value: string) => void
}

const AlertContext = createContext<UseAlertProps>({
  setupMessage: () => {
    return
  }
})

const AlertProvider = ({ children }: AlertProps) => {
  const [message, setMessage] = useState<string>('')

  const handleClose = () => {
    setMessage('')
  }
  const setupMessage = (value: string) => {
    setMessage(value)
  }

  return (
    <AlertContext.Provider
      value={{
        setupMessage
      }}
    >
      <Alert open={!!message} message={message} close={handleClose} />
      {children}
    </AlertContext.Provider>
  )
}

function useAlert() {
  const context = useContext(AlertContext)
  return context
}

export { AlertProvider, useAlert }
