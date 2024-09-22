import React from 'react'
import Input from './Input'
const Formfield = ({ divClass, label, labelClass, type, name, value, onChange, classes, placeholder }) => {
  return (
    <div className={divClass}>
        <label className={labelClass}>{label}</label>
        <Input type={type} name={name} value={value} onChange={onChange} classes={classes} placeholder={placeholder}/>
    </div>
  )
}

export default Formfield