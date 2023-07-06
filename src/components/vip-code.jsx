import Swal from 'sweetalert2'
import Input from './input'
import { useState } from 'react'
import { useContext } from 'react'

import SubmitBtn from './submit-btn'
import Spinner from './spinner'

import { validateVipCode } from '../api/vip-code'
import VipCodeContext from '../context/vip-code'

export default function VipCode() {

  const { vipCode, setVipCode } = useContext(VipCodeContext)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e) {

    // Show spinner while loading
    setIsLoading(true)

    e.preventDefault()

    // Validate vip code with api
    validateVipCode(vipCode).then(isValid => {

      // Show alerts
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

      // Hide spinner
      setIsLoading(false)
    })
  }

  return (
    <form
      className={`
        container w-5/6
        flex items-center justify-start
        h-28
        mb-14
      `}
      onSubmit={(e) => handleSubmit(e)}
    >
      {
        isLoading
          ?
          <Spinner
            size="s"
            alt={true}
          />
          :

          <fieldset
            className={`
              w-full
              flex items-start justify-center flex-col
              md:w-8/12 md:flex-row
              sm:w-10/12
              lg:w-5/12
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
              w-32
              md:mt-10 md:ml-5 
            `}>
              <SubmitBtn
                value='Apply'
                extraClass={`w-32 py-2`}
              />
            </div>
          </fieldset>

      }
    </form>
  )
}