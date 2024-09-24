import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';

const UsuarioDetalles = () => {
  const { id } = useParams(); 
  const [usuario, setUsuario] = useState(null); 

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get(`http://localhost:8000/api/usuarios/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario", error);
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) {
    return <div>Cargando...</div>; 
  }

  const fechaIngreso = new Date(usuario.fecha_ingreso);
  const fechaActual = new Date();
  const antiguedad = fechaActual.getFullYear() - fechaIngreso.getFullYear();
  const mesesDiferencia = fechaActual.getMonth() - fechaIngreso.getMonth();
  const antiguedadTotal = mesesDiferencia < 0 ? antiguedad - 1 : antiguedad;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white ">
    <div className="flex items-center mb-4">
      <img src="/usuario.png" alt={`${usuario.nombre} ${usuario.apellido}`} className="w-20 h-20 rounded-full mr-4" />
      <h1 className="text-2xl font-bold uppercase">{usuario.nombre} {usuario.apellido} ({usuario.legajo})</h1>
    </div>

<div className="max-w-full p-4 bg-gray-100 rounded-lg mb-4">
<div className="grid grid-cols-4 gap-4">
  <div >
    <p className="font-semibold mr-2">Número de Legajo:</p>
    <p>{usuario.legajo}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">DNI:</p>
    <p>{usuario.dni}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">CUIL:</p>
    <p>{usuario.cuil}</p>
  </div>
  <div >
    <p className="font-semibold mr-2">Género:</p>
    <p>{usuario.genero}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Fecha de Ingreso:</p>
    <p>{new Date(usuario.fecha_ingreso).toLocaleDateString('es-ES')}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Antigüedad:</p>
    <p>{antiguedadTotal} año(s) {mesesDiferencia < 0 ? 12 + mesesDiferencia : mesesDiferencia} mes(es)</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Fecha de Nacimiento:</p>
    <p>{new Date(usuario.fecha_nacimiento).toLocaleDateString('es-ES')}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Dirección:</p>
    <p>{usuario.calle}, {usuario.numero}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Nacionalidad:</p>
    <p>{usuario.nacionalidad}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Ciudad:</p>
    <p>{usuario.ciudad}, {usuario.cp}, {usuario.provincia}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Codigo Postal:</p>
    <p>{usuario.cp}</p>
  </div>

  <div>
    <p className="font-semibold mr-2">Estado Civil:</p>
    <p>{usuario.estado_civil}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Estado:</p>
    <p>{usuario.activo ? 'Activo' : 'Inactivo'}</p>
  </div>
</div>
</div>

<h5 className="text-md P-4 font-bold mt-6">DATOS DE CONTACTO</h5>
<div className=" p-4 bg-gray-100 rounded-lg mb-4 grid grid-cols-3 gap-4">
  <div >
    <p className="font-semibold ">Telefono</p>
    <p >{usuario.telefono}</p>
  </div>
  <div>
    <p className="font-semibold mr-2">Email:</p>
    <p >{usuario.email}</p>
  </div>

</div>

      
<h5 className="text-md P-4 font-bold mt-6">INTEGRANTES FAMILIARES</h5>
  {usuario.familiares && usuario.familiares.length > 0 ? (
        <div className="mt-4">
          {usuario.familiares.map((familiar, index) => (
           <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
      
           
           <div className="grid grid-cols-3 gap-4">
           <div >
               <p className="font-semibold mr-2">Nombre y apellido:</p>
               <p>{familiar.nombre} {familiar.apellido}</p>
             </div>
             <div >
               <p className="font-semibold mr-2">Vínculo:</p>
               <p>{familiar.vinculo}</p>
             </div>
             <div>
               <p className="font-semibold mr-2">DNI:</p>
               <p>{familiar.dni}</p>
             </div>
             <div>
               <p className="font-semibold mr-2">Convive:</p>
               <p>{familiar.convive ? 'Sí' : 'No'}</p>
             </div>
             <div>
              <p className="font-semibold mr-2">Beneficiario del seguro de vida:</p>
                {familiar.seguro_vida === "1" ? (
                  <p>Sí</p>
                ) : familiar.seguro_vida === "0" ? (
                  <p>No</p>
                ) : (
                  <p>No especificado</p> 
                )}
            </div>
            <div>
              <p className="font-semibold mr-2">Porcentaje Seguro:</p>
                {familiar.seguro_vida === "1" ? (
                  <p>{familiar.porcentaje_seguro_vida}%</p>
                ) : (
                  <p>No es Beneficiario</p> 
                )}
            </div>
                  </div>
                </div>
                
                  ))}
        </div>
  ) : (
    <p>No se encuentran familiares registrados.</p>
  )}
</div>
  );
};

export default UsuarioDetalles;
