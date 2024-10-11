import React from 'react'
import Input from './Input'
const Formfield = ({ divClass, label, labelClass, type, name, value, onChange, classes, placeholder, readonly, error, required }) => {
  return (
    <div className={divClass}>
        <label className={labelClass}>{label} {required ? <span className="text-red-600"><small>*</small></span> : ''}</label>
        <Input type={type} name={name} value={value} onChange={onChange} classes={classes} placeholder={placeholder} readonly={readonly} required={true} />
        {error && <div className="invalid-feedback text-red-600 text-sm font-medium">{error}</div>}
    </div>
  )
}

export default Formfield