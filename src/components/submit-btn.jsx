import PropTypes from 'prop-types'

export default function SubmitBtn ({value, extraClass}) {

  const className = `
    no-collect 
    inline-block
    bg-blue border-blue border-2 
    text-gold text-2xl font-bold 
    cursor-pointer 
    rounded-xl 
    duration-300 hover:rounded-3xl hover:bg-white hover:text-blue
    ${extraClass}
  `

  return (
    <input 
      type="submit" 
      value={value}
      className={className}/>
  )
}

SubmitBtn.propTypes = {
  value: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
}