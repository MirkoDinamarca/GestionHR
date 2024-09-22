import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const UsuarioDetalles = () => {
  const { id } = useParams(); 
  const [usuario, setUsuario] = useState(null); 

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/usuarios/${id}`); 
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario", error);
      }
    };

    fetchUsuario();
  }, [id]);
  if (!usuario) {
    return <div>Cargando...</div>; // Mensaje mientras se cargan los datos
  }

    // Calcular antigüedad
    const fechaIngreso = new Date(usuario.fecha_ingreso);
    const fechaActual = new Date();
    const antiguedad = fechaActual.getFullYear() - fechaIngreso.getFullYear();
    const mesesDiferencia = fechaActual.getMonth() - fechaIngreso.getMonth();
  
    // Ajustar antigüedad si el mes de ingreso es mayor que el mes actual
    const antiguedadTotal = mesesDiferencia < 0 ? antiguedad - 1 : antiguedad;
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
         <img src="/usuario.png" alt={`${usuario.nombre} ${usuario.apellido}`} className="w-16 h-16 rounded-full mr-4"/>
      <h1 className="text-3xl font-bold mb-4">{usuario.nombre} {usuario.apellido}</h1>
      <div className="grid grid-cols-2 gap-4">
        
        <div>
          <p className="font-semibold">Legajo:</p>
          <p>{usuario.legajo}</p>
        </div>
        <div>
          <p className="font-semibold">DNI:</p>
          <p>{usuario.dni}</p>
        </div>
        <div>
          <p className="font-semibold">CUIL:</p>
          <p>{usuario.cuil}</p>
        </div>
        <div>
          <p className="font-semibold">Correo:</p>
          <p>{usuario.email}</p>
        </div>
        <div>
          <p className="font-semibold">Teléfono:</p>
          <p>{usuario.telefono}</p>
        </div>
        <div>
          <p className="font-semibold">Género:</p>
          <p>{usuario.genero}</p>
        </div>
        <div>
          <p className="font-semibold">Fecha de Ingreso:</p>
          <p>{new Date(usuario.fecha_ingreso).toLocaleDateString('es-ES')}</p>
        </div>
        <div>
          <p className="font-semibold">Antigüedad:</p>
          <p>{antiguedadTotal} año(s) {mesesDiferencia < 0 ? 12 + mesesDiferencia : mesesDiferencia} mes(es)</p>
        </div>
        <div>
          <p className="font-semibold">Fecha de Nacimiento:</p>
          <p>{new Date(usuario.fecha_nacimiento).toLocaleDateString('es-ES')}</p>
        </div>
        <div>
          <p className="font-semibold">Dirección:</p>
          <p>{usuario.calle} {usuario.numero}, {usuario.ciudad}, {usuario.cp}, {usuario.provincia}</p>
        </div>
        <div>
          <p className="font-semibold">Nacionalidad:</p>
          <p>{usuario.nacionalidad}</p>
        </div>
        <div>
          <p className="font-semibold">Estado Civil:</p>
          <p>{usuario.estado_civil}</p>
        </div>
        <div>
          <p className="font-semibold">Estado:</p>
          <p>{usuario.activo ? 'Activo' : 'Inactivo'}</p>
        </div>
      </div>
    </div>
  );
};

export default UsuarioDetalles;
