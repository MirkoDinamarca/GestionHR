import React, { useState, useEffect } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import axios from "axios";

const TabsPages = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [datos, setDatos] = useState({});

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
        }
        const response = await axios.get(
          `http://localhost:8000/api/usuarios/${id}`,
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

  return (
    <>
      <ul className="flex border-b tab-buttons">
        <li class="mr-1">
          <Link
            to="datos"
            state= {{ usuario }}
            className="tab-item bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
          >
            Datos Personales
          </Link>
        </li>

        <li class="mr-1">
          <Link
            to="examenes"
            className="tab-item bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
          >
            Exámenes Médicos
          </Link>
        </li>
        <li class="mr-1">
          <Link
            to="documentos"
            className="tab-item bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
          >
            Documentacion
          </Link>
        </li>
      </ul>
      <div className="mx-auto p-6 bg-white ">
        <Outlet />
      </div>
    </>
  );
};

export default TabsPages;
