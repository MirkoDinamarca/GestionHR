import { useState } from "react"

// Genera un componente de alerta que dependiendo si es un error o no, se muestra de un color u otro
const Alerta = ({ mensaje, tipo }) => {
  return (
    <div className={`bg-${tipo}-100 border border-${tipo}-200 text-${tipo}-700 p-4 mb-5 rounded-md`} role="alert">
      <p className="font-bold"> {mensaje}</p>
    </div>
  )
}

export default Alerta