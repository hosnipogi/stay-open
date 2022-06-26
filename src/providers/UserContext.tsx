import React, { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as signOutGoogle,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from 'config/firebase'
import { IUser } from 'types'

type Props = {
  children: React.ReactNode
}

interface IUserValues {
  user: IUser
  setUser: React.Dispatch<React.SetStateAction<IUser>>
  isLoggedIn: boolean
  signInWithGoogle: () => void
  signOut: () => void
}

const provider = new GoogleAuthProvider()

export const UserContext = createContext<IUserValues>({} as IUserValues)

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>({ email: undefined, name: undefined })
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof user.email !== 'undefined'
  )

  useEffect(() => {
    if (typeof user.email !== 'undefined') {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [user.email])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName && user.email) {
        setUser({ name: user.displayName, email: user.email })
      }
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider)
      setUser({ name: user.displayName!, email: user.email! })
    } catch (e) {
      console.info({ e })
    }
  }

  const signOut = () => {
    signOutGoogle(auth)
    setUser({ name: undefined, email: undefined })
  }

  const userValues = {
    signInWithGoogle,
    signOut,
    user,
    isLoggedIn,
    setUser,
  }

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  )
}
