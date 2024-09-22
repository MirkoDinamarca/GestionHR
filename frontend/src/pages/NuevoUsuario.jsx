import React, { useState } from 'react';
import axios from 'axios';


const NuevoUsuario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    legajo: '',
    dni: '',
    cuil: '',
    email: '',
    password: '',
    telefono: '',
    genero: '',
    fecha_ingreso: '',
    fecha_nacimiento: '',
    calle: '',
    numero: '',
    ciudad: '',
    cp: '',
    provincia: '',
    nacionalidad: '',
    estado_civil: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/usuarioNuevo', formData);
      console.log('Usuario creado con éxito:', response.data);
      // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      // Aquí puedes mostrar un mensaje de error
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-2xl rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Legajo:</label>
          <input
            type="text"
            name="legajo"
            value={formData.legajo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">DNI:</label>
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">CUIL:</label>
          <input
            type="text"
            name="cuil"
            value={formData.cuil}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            
          />
        </div>
        <div>
          <label className="block text-gray-700">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Género:</label>
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
        <div>
          <label className="block text-gray-700">Fecha de Ingreso:</label>
          <input
            type="date"
            name="fecha_ingreso"
            value={formData.fecha_ingreso}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha de Nacimiento:</label>
          <input
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Calle:</label>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Número:</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Ciudad:</label>
          <input
            type="text"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Código Postal (CP):</label>
          <input
            type="text"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Provincia:</label>
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Nacionalidad:</label>
          <input
            type="text"
            name="nacionalidad"
            value={formData.nacionalidad}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Estado Civil:</label>
          <select
            name="estado_civil"
            value={formData.estado_civil}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Selecciona una opción</option>
            <option value="Soltero/a">Soltera</option>
            <option value="Casado/a">Casada</option>
            <option value="Divorciado/a">Divorciada</option>
            <option value="Viudo/a">Viudo/a</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default NuevoUsuario;
