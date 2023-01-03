import { createContext, useContext, useState } from 'react'

import { UserType } from '../types/useUser'

type UserProps = {
  children: JSX.Element
}

type UseUserProps = {
  user: UserType | false
  setupUser: (match: UserType) => void
  getToken: () => string
  logout: () => void
}

const UserContext = createContext<UseUserProps>({
  user: false,
  setupUser: () => {
    return
  },
  getToken: () => '',
  logout: () => {
    return
  }
})

const UserProvider = ({ children }: UserProps) => {
  const [user, setUser] = useState<UserType | false>(false)

  const setupUser = (newUser: UserType) => {
    sessionStorage.setItem('tokenHello', newUser.token)
    setUser(newUser)
  }

  const getToken = () => {
    if (user) return user.token
    else return ''
  }

  const logout = () => {
    sessionStorage.removeItem('tokenHello')
    setUser(false)
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setupUser,
        getToken,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

function useUser() {
  const context = useContext(UserContext)
  return context
}

export { UserProvider, useUser }
