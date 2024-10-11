import { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Alerta from "../components/Alerta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, auth } = useContext(AuthContext);
  const [alerta, setAlerta] = useState(null);
  /**
   * Escucha el evento submit del formulario y llama a la función login 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  
  // Si auth es un objeto vacío, se muestra un mensaje de error
  useEffect(() => {
    if (auth.error) {
      setAlerta({
        mensaje: auth.error,
        tipo: "red",
      });
    }
  }, [auth]);

  return (
    <>
    {auth && auth.id && <Navigate to="/" />}
      <section className="antialiased bg-gradient-to-br from-indigo-100 to-white">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <div className="flex flex-col w-full">
              <div>
                <img src="/logo.png" className="w-24" alt="" />
              </div>
              <h1 className="text-5xl text-gray-800 font-bold">GestionHR</h1>
              <p className="w-5/12 mx-auto md:mx-0 text-gray-700">
                Inicia sesión para poder gestionar el sistema
              </p>
            </div>
            <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
              {alerta && <Alerta mensaje={alerta.mensaje} tipo={alerta.tipo} />}
              <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                  Iniciar Sesión
                </h2>
                <form onSubmit={handleSubmit} method="POST" className="w-full">
                  <div id="input" className="flex flex-col w-full my-5">
                    <label htmlFor="email" className="text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ingrese su email por favor"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div id="input" className="flex flex-col w-full my-5">
                    <label htmlFor="password" className="text-gray-700 mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Ingrese su contraseña"
                      className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div id="button" className="flex flex-col w-full my-5">
                    <button
                      type="submit"
                      className="w-full py-4 bg-indigo-600 rounded-lg text-white"
                    >
                      <div className="flex flex-row items-center justify-center">
                        <div className="mr-2">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <div className="font-bold">Ingresar</div>
                      </div>
                    </button>
                    {/* <div className="flex justify-evenly mt-5">
                      <a
                        href="#"
                        className="w-full text-center font-medium text-gray-700"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
