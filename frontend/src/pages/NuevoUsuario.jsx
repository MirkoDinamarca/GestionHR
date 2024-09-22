import { useState } from "react";
import Formfield from "../components/Formfield";
import Integrante from "../components/Integrante";
import axios from "axios";

const NuevoUsuario = () => {
  const [integrantesFamiliares, setIntegrantesFamiliares] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    legajo: "",
    dni: "",
    cuil: "",
    email: "",
    password: "",
    telefono: "",
    genero: "",
    fecha_ingreso: "",
    fecha_nacimiento: "",
    calle: "",
    numero: "",
    ciudad: "",
    cp: "",
    provincia: "",
    nacionalidad: "",
    estado_civil: "",
    integrantes: []
  });

  // Al momento de escuchar por un cambio en los inputs setea el valor en el estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Genera la carga de un nuevo usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/usuarioNuevo",
        formData
      );
      console.log("Usuario creado con éxito:", response.data);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  /**
   * Genera un nuevoIntegrante en el formulario cada vez que se presiona el botón
   * Y lo agrega al estado de integrantesFamiliares, asi como al estado de formData
   */
  const handleNuevoIntegrante = () => {
    event.preventDefault();

    const nuevoIntegrante = { 
      id: Date.now(),
      nombre: "",
      apellido: "",
      convive: "",
      vinculo: "",
      dni: "",
      seguro_vida: "",
      porcentaje_seguro_vida: "",
     }

    // El formulario del formData se actualiza con el nuevo integrante
    setFormData(estadoPrevio => ({
      ...estadoPrevio,
      integrantes: [...estadoPrevio.integrantes, nuevoIntegrante]
    }));

    setIntegrantesFamiliares([...integrantesFamiliares, nuevoIntegrante]);
  };

  /**
   * Función que se encarga de manejar los cambios en los integrantes familiares
   * Al escuchar por un cambio se modifica el integrante a traves del index
   * Nuevamente se setean los estados de integrantesFamiliares y formData 
   */
  const handleChangeIntegrante = (index, campo, value) => {
    const integrantes = [...integrantesFamiliares];
    integrantes[index][campo] = value;
    setIntegrantesFamiliares(integrantes);

    setFormData(estadoPrevio => ({
      ...estadoPrevio,
      integrantes: integrantes
    }));
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <section className="grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <p className="font-bold text-xl text-indigo-600">
              Datos Personales del Usuario
            </p>
          </div>

          <Formfield
            label="Nombre del usuario"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el nombre del usuario"
          />

          <Formfield
            label="Apellido del usuario"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el apellido del usuario"
          />
          <Formfield
            label="N° de Legajo"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="number"
            name="legajo"
            value={formData.legajo}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el legajo"
          />

          <Formfield
            label="N° de DNI"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el DNI"
          />

          <Formfield
            label="N° de CUIL"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="cuil"
            value={formData.cuil}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el CUIL"
          />

          <Formfield
            label="Ingrese el correo"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el correo"
          />

          <Formfield
            label="Ingrese la contraseña"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese la contraseña"
          />

          <Formfield
            label="Ingrese el telefono"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el telefono"
          />

          <div>
            <label className="block font-bold text-gray-500">Género:</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona una opción</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <Formfield
            label="Fecha de Ingreso"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="date"
            name="fecha_ingreso"
            value={formData.fecha_ingreso}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
          />

          <Formfield
            label="Fecha de Nacimiento"
            labelClass="block font-bold text-gray-500"
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
          />

          <div>
            <label className="block text-gray-500 font-bold">
              Estado Civil:
            </label>
            <select
              name="estado_civil"
              value={formData.estado_civil}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecciona una opción</option>
              <option value="Soltero/a">Soltero/a</option>
              <option value="Casado/a">Casado/a</option>
              <option value="Divorciado/a">Divorciado/a</option>
              <option value="Viudo/a">Viudo/a</option>
            </select>
          </div>

          <hr className="col-span-4 m-3" />

          <div className="col-span-4">
            <p className="font-bold text-xl text-indigo-600">Dirección Real</p>
          </div>

          <Formfield
            label="Calle"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese la calle"
          />

          <Formfield
            label="Número"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el número"
          />

          <Formfield
            label="Ciudad"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese la ciudad"
          />

          <Formfield
            label="Código Postal (CP)"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese el código postal"
          />

          <Formfield
            label="Provincia"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese la provincia"
          />

          <Formfield
            label="Nacionalidad"
            labelClass="block text-gray-700 font-bold text-gray-500"
            type="text"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            classes="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Ingrese la nacionalidad"
          />

          <hr className="col-span-4 m-3" />

          <div className="col-span-4">
            <p className="font-bold text-xl text-indigo-600">
              Integrantes Familiares
            </p>
          </div>

          <div className="col-span-4">
            <section id="containerIntegrantesFamiliares" className="space-y-5">
              {integrantesFamiliares.map((integrante, index) => (
                <Integrante key={integrante.id || index} index={index} integrante={integrante} handleChangeIntegrante={handleChangeIntegrante}  />
              ))}
            </section>
            <div className="text-center mt-3">
              <button
                type="button"
                className="bg-blue-200 p-2 rounded-md font-medium border border-blue-300 hover:bg-blue-300 transition-all duration-150"
                onClick={handleNuevoIntegrante}
              >
                Agregar integrante familiar
              </button>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-52 float-end bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default NuevoUsuario;
