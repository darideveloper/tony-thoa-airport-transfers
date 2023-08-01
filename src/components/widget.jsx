import PropTypes from 'prop-types'

export default function Widget ({title, children, extraClassName=""}) {
  return (
    <article className={`widget ${extraClassName}`}>
      <h2 className="uppercase text-white text-2xl py-5">{title}</h2>
      {children}
    </article>
  )
}

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  extraClassName: PropTypes.string,
}