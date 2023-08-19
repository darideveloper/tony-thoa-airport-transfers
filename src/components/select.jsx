import PropTypes from 'prop-types'

export default function Select ({label, activeOption="", name, handleUpdate, options}) {

  return (
    <label className='w-full py-2'>
      <span className='text-lg'>{label}</span>
      <select 
        name={name} 
        onChange={(e) => handleUpdate(e)} 
        value={activeOption}
        className={`
          block 
          border-2 
          w-full 
          px-5 
          h-12 
          mt-2 
          border-blue 
          rounded-lg 
          transition duration-300 
          focus:shadow-lg
          opacity-60 focus:opacity-100
        `}
      >
        {options.map(({value, label}) => (
          // Select activeOption if it matches the current value
          <option value={value} key={value}>{label}</option>
        ))}
        
      </select>
    </label>
  )
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
}