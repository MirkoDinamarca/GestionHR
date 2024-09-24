import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Breadcrumb from '../components/Breadcrumb';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

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
    navigate(`${id}`); 
  };

  const breadcrumbItems = [
    { label: 'Usuarios', link: '/usuarios' },
    { label: ' Historico Empleados' }
  ];

  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Breadcrumb items={breadcrumbItems} />
    <div class="mb-4">
      <button onClick={() => navigate('nuevo-usuario')} className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Nuevo Empleado
      </button>
    </div>
    
      <ul className="space-y-4">
        {usuarios.map((usuario) => (
          <li 
            key={usuario.id} 
            className="bg-white border border-gray-300 rounded-lg shadow-md p-4 transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg flex justify-between items-center"
            onClick={() => handleRedirection(usuario.id)} 
          >
            <img src="/usuario.png" alt={`${usuario.nombre} ${usuario.apellido}`} className="w-16 h-16 rounded-full mr-4"/>
            <div className="flex-1 flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-gray-600">{usuario.nombre} {usuario.apellido}</p>
              <p className="text-gray-600">Legajo: {usuario.legajo}</p>
              <p className="text-gray-600">Email: {usuario.email}</p>
              <p className="text-gray-600">Ingreso: {new Date(usuario.fecha_ingreso).toLocaleDateString('es-ES')}</p>
              <p className="text-gray-600">Estado: {usuario.activo ? 'Activo' : 'Inactivo'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
