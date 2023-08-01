import PropTypes from 'prop-types'

export default function Spinner ({size="l", alt=false}) {

  const className = size == "l" ? "w-30" : "w-10"

  return (
    <img 
      src={alt ?  "./imgs/spinner_alt.gif" : "./imgs/spinner.gif"} 
      alt="loading spinner" 
      className={className} />
  )
}

Spinner.propTypes = {
  size: PropTypes.string,
  alt: PropTypes.bool,
}