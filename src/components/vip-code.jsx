import Input from './input'
import { useState, useEffect } from 'react'

import SubmitBtn from './submit-btn'

export default function VipCode() {

  const [vipCode, setVipCode] = useState('')

  useEffect(() => {
    console.log({ vipCode })
  }, [vipCode])

  return (
    <form
      className={`
        container w-5/6
        flex items-center justify-start
        mb-10
      `}
    >
      <fieldset
        className={`
          w-5/12
          flex items-center justify-center
        `}
      >
        <Input
          label='VIP Code'
          type="text"
          placeholder='12345'
          name='vipCode'
          value={vipCode}
          handleUpdate={(e) => setVipCode(e.target.value)}
        />

        <div className={`
            wrapper-submit
            mt-10 ml-5 w-32
          `}>
          <SubmitBtn 
            value='Check'
            py={2}
            w={32}
          />
        </div>
      </fieldset>

    </form>
  )
}