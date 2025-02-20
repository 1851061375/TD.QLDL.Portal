import { IWithChildren } from '../../../types'
import { Login } from '.'
import { useAppSelector } from '../../../lib/redux/Hooks'
import { useState, useEffect} from 'react'


export const RequiredAuth = ({children} : IWithChildren) => {
  const {data: user} = useAppSelector(state => state.user)
  
  if(!user){
    return children
  }

  return <Login/>
}
