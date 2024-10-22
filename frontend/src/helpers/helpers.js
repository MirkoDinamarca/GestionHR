/**
 * Verifica que el DNI ingresado sea de 8 caracteres y numeros.
 */
export const handleDniChange = (e, setError) => {
  const value = e.target.value;
  const dniRegex = /^[0-9]{7,8}$/;
  if (!dniRegex.test(value)) {
    setError("El DNI debe contener entre 7 y 8 números.");
  } else {
    setError(null);
  }
  // setDni(value);
};

/**
 * Verifica que el CUIL ingresado sea válido y lo formatea.
 */
export const handleCuilChange = (e, formData, setFormData, setError) => {
    const value = e.target.value;
    const valor_formateado = _formatearCuil(value, setError);
    setFormData({ ...formData, cuil: valor_formateado });
};

/**
 * Formatea el CUIL ingresado por el usuario en el formato XX-XXXXXXXX-X.
 */
function _formatearCuil(value, setError) {
  // Limpiar aquello que no sea un numero
  const numericValue = value.replace(/\D/g, "");
  let cuilFormateado = numericValue;

  if (numericValue.length > 2) {
    cuilFormateado = `${numericValue.slice(0, 2)}-${numericValue.slice(2)}`;
    setError(null);
  } else {
    setError("El CUIL debe contener al menos 2 números.");
  }
  if (numericValue.length > 10) {
    cuilFormateado = `${numericValue.slice(0, 2)}-${numericValue.slice(
      2,
      10
    )}-${numericValue.slice(10, 11)}`;
    setError(null);
  } else {
    setError("El CUIL debe contener 11 números.");
  }

  return cuilFormateado;
}
