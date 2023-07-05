import Swal from 'sweetalert2'
import Input from './input'
import { useState } from 'react'

import SubmitBtn from './submit-btn'

import { validateVipCode } from '../api/vip-code'

export default function VipCode() {

  const [vipCode, setVipCode] = useState('')

  function handleSubmit (e) {
    e.preventDefault()
    console.log({ vipCode })

    validateVipCode(vipCode).then(isValid => {
      if (isValid) {
        Swal.fire(
          'Vip Code Validated!',
          'Now you have a free service',
          'success'
        )
      } else {
        Swal.fire(
          'Vip Code Invalid!',
          'Check your code and try again',
          'error'
        )
      }
    })

  }

  return (
    <form
      className={`
        container w-5/6
        flex items-center justify-start
        mb-10
      `}
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset
        className={`
          w-5/12
          flex items-center justify-center
        `}
      >
        <Input
          label='You have a VIP Code?'
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
            extraClass={`w-32 py-2`}
          />
        </div>
      </fieldset>

    </form>
  )
}