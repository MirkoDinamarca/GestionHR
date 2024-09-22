const Input = ({type, name, value, onChange, id, classes, placeholder}) => {
  return (
    <input type={type} name={name} value={value} onChange={onChange} id={id} className={classes} placeholder={placeholder} />
  )
}

export default Input