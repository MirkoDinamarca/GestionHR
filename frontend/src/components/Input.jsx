const Input = ({type, name, value, onChange, id, classes, placeholder, readonly}) => {
  return (
    <input type={type} name={name} value={value} onChange={onChange} id={id} className={classes} placeholder={placeholder} readOnly={readonly} />
  )
}

export default Input