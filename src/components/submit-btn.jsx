import PropTypes from 'prop-types'

export default function SubmitBtn ({value, extraClass, type="submit", onClick=() => {}}) {

  const className = `
    no-collect 
    inline-block
    bg-gold border-gold border-2 
    text-white text-2xl font-bold 
    cursor-pointer 
    rounded-xl 
    duration-300 hover:rounded-3xl hover:bg-white hover:text-green
    ${extraClass}
  `

  return (
    <input 
      type={type} 
      value={value}
      className={className}
      onClick={onClick}
    />
  )
}

SubmitBtn.propTypes = {
  value: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
}