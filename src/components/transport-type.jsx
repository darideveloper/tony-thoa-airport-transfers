import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function TransportType ({id, text, price, handleUpdateType, transportType, initialActive}) {

  const [hover, setHover] = useState (false)

  function handleChange (e) {
    // Submit activate checked to parent
    handleUpdateType (id)
  }

  // active components with initialActive when loads
  useEffect(() => {

    // Detect if label is hover
    const input = document.querySelector (`[id="${id}"]`)
    const label = input.parentNode
    label.addEventListener ('mouseover', () => {
      setHover (true)
    })
    label.addEventListener ('mouseout', () => {
      setHover (false)
    })

  }, [])

  return (
    <div className="transport-type">

      <div className="checkbox opacity-80 ms-3">
        <label htmlFor={id} className='flex items-center justify-start mb-10 md:justify-center cursor-pointer'>

          <div className="box border-2 w-14 h-8 border-blue flex items-center justify-center">
            {/* Activate this div when selected */}
            <div className="inside bg-blue w-8 h-4 transition-opacity duration-300" style={{opacity: transportType == id ? "1" : (hover ? "0.6" : "0")}}></div>
          </div>

          <div className="text ms-5 w-full block">
            <h3 className='uppercase text-xl'>{text}</h3>
            <span className='block'>price</span>
            <span className="price text-gold font-bold text-2xl">{price}.00 USD</span>
          </div>

        </label>
        
        <input type="radio" name="transport-type" className='hidden no-collect' id={id} onChange={(e) => {handleChange (e)}} checked={transportType == id ? true : false} />
        
      </div>
    </div>
  )
}

TransportType.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  handleUpdateType: PropTypes.func.isRequired,
  transportType: PropTypes.string.isRequired,
  initialActive: PropTypes.bool.isRequired,
}