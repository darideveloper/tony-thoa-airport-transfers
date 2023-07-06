import { createContext, useState } from 'react'

export const VipCodeContext = createContext()

export function VipCodeContextProvider ({children}) {

  // VipCod  status
  const [vipCode, setVipCode] = useState ("")
  const [isVip, setIsVip] = useState (false)

  return (
    <VipCodeContext.Provider value={{vipCode, setVipCode, isVip, setIsVip}}>
      {children}
    </VipCodeContext.Provider>
  )
} 

export default VipCodeContext