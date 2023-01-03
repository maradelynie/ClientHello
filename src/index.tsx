import React from 'react'
import ReactDOM from 'react-dom/client'
import './globalStyles.scss'

import { AlertProvider } from './hooks/useAlert'
import { BackdropProvider } from './hooks/useBackdrop'
import { MatchProvider } from './hooks/useMatch'
import { UserProvider } from './hooks/useUser'
import reportWebVitals from './reportWebVitals'
import Routes from './Routes'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <MatchProvider>
    <UserProvider>
      <>
        <div className="global-container">
          <AlertProvider>
            <BackdropProvider>
              <>
                <Routes />
                <span className="marcadagua">mara | bruni</span>
              </>
            </BackdropProvider>
          </AlertProvider>
        </div>
      </>
    </UserProvider>
  </MatchProvider>
)
reportWebVitals()
