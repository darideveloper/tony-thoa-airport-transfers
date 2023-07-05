import { createContext, useState } from 'react'

export const VipCodeContext = createContext()

export function VipCodeContextProvider ({children}) {

  // VipCod  status
  const [vipCode, setVipCode] = useState ("")

  return (
    <VipCodeContext.Provider value={{vipCode, setVipCode}}>
      {children}
    </VipCodeContext.Provider>
  )
} 

export default VipCodeContext