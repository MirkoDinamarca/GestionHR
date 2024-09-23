import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faChalkboardTeacher,
  faFileAlt,
  faChevronRight,
  faCircleExclamation,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth, logout } = useAuth();
    // Estado de las vistas de los desplegables
  const [desplegable, setDesplegable] = useState(false);

  // Funcion para desplegar los submenus
  const handleDesplegable = () => {
    setDesplegable(!desplegable);
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <aside className="col-span-1">
    <div className="h-screen m-0 p-5">
      <div className="bg-white shadow-lg shadow-blue-200 border rounded-xl h-full">
        <article className="p-10">
          <h1 className="text-4xl font-semibold tracking-wide">GestionHR</h1>
          <small>Lorem ipsum dolor sit amet consectetur </small>
        </article>
        <ul className='text-gray-700'>
          <li className="bg-gradient-to-r from-indigo-200 border-l-4 border-l-indigo-700 py-2 font-semibold">
            <Link to="/inicio" className="flex items-center gap-5 pl-10 tracking-wide"><FontAwesomeIcon size='lg' className="w-5" icon={faHome} /> Inicio</Link>
          </li>
          <li className="border-l-4 border-l-white py-2 font-semibold hover:bg-gradient-to-r hover:from-gray-100 hover:border-l-gray-300 transition-all duration-150">
            <p href="/#" className="flex items-center gap-5 pl-10 tracking-wide cursor-pointer" onClick={handleDesplegable}><FontAwesomeIcon size='lg' className="w-5" icon={faUser} /> Usuarios</p>
            {desplegable && (
              <ul className={`transition-all duration-300 ease-in-out overflow-hidden ${desplegable ? 'h-auto' : 'h-0'} space-y-1`}>
                <li className='font-semibold ml-20'>
                  <Link to="/usuarios/nuevo-usuario" className="flex items-center gap-2 tracking-wide mt-1 hover:bg-gray-200 m-1 p-1 pl-3 rounded-md"><FontAwesomeIcon size='lg' className="w-2" icon={faChevronRight} /> Nuevo Usuario</Link>
                  {/* <a href="/#" className="flex items-center gap-2 tracking-wide mt-1 hover:bg-gray-200 m-1 p-1 pl-3 rounded-md"><FontAwesomeIcon size='lg' className="w-2" icon={faChevronRight} /> Nuevo Empleado</a> */}
                </li>
                <li className='font-semibold ml-20'>
                  <Link to="/usuarios" className="flex items-center gap-2 tracking-wide mt-1 hover:bg-gray-200 m-1 p-1 pl-3 rounded-md"><FontAwesomeIcon size='lg' className="w-2" icon={faChevronRight} /> Histórico</Link>
                </li>
              </ul>
            )}
          </li>
          {/* <li className="border-l-4 border-l-white py-2 font-semibold hover:bg-gradient-to-r hover:from-gray-100 hover:border-l-gray-300 transition-all duration-150">
            <a href="/#" className="flex items-center gap-5 pl-10 tracking-wide"><FontAwesomeIcon size='lg' className="w-5" icon={faChalkboardTeacher} /> Capacitaciones</a>
          </li>
          <li className="border-l-4 border-l-white py-2 font-semibold hover:bg-gradient-to-r hover:from-gray-100 hover:border-l-gray-300 transition-all duration-150">
            <a href="/#" className="flex items-center gap-5 pl-10 tracking-wide"><FontAwesomeIcon size='lg' className="w-5" icon={faFileAlt} /> Postulaciones</a>
          </li>
          <li className="border-l-4 border-l-white py-2 font-semibold hover:bg-gradient-to-r hover:from-gray-100 hover:border-l-gray-300 transition-all duration-150">
            <a href="/#" className="flex items-center gap-5 pl-10 tracking-wide"><FontAwesomeIcon size='lg' className="w-5" icon={faCog} /> Configuracion</a>
          </li> */}
        </ul>
        {/* ESTO DEL BOTON ES TEMPORAL, SOLAMENTE ES PARA PODER CERRAR SESION ACTUALMENTE */}
        <br />
        <br />
        <br />
        <button onClick={() => handleLogout()} className="bg-indigo-500 text-white uppercase font-bold p-3 rounded-sm mt-5">
          Cerrar Sesion
        </button>
          <Link to="/logout" ></Link>
      </div>
    </div>
  </aside>
  )
}

export default Sidebar