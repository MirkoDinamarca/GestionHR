import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate(); // Hook para manejar la redirección

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get("http://localhost:8000/api/usuarios", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsuarios(response.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleRedirection = (id) => {
    navigate(`${id}`); // Ruta de redirección con el ID del usuario
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Empleados</h2>
      <button 
        onClick={() => navigate('/nuevo-usuario')} 
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 mb-4">
        Nuevo Empleado
      </button>

      <ul className="space-y-4">
        {usuarios.map((usuario) => (
          <li 
            key={usuario.id} 
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex justify-between items-center"
            onClick={() => handleRedirection(usuario.id)} 
          >
            <img src="/usuario.png" alt={`${usuario.nombre} ${usuario.apellido}`} className="w-16 h-16 rounded-full mr-4"/>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{usuario.nombre} {usuario.apellido}</h3>
              <p className="text-gray-600">Legajo: {usuario.legajo}</p>
              <p className="text-gray-600">Fecha de Ingreso: {new Date(usuario.fecha_ingreso).toLocaleDateString('es-ES')}</p>
              <p className="text-gray-600">Estado: {usuario.activo ? 'Activo' : 'Inactivo'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
