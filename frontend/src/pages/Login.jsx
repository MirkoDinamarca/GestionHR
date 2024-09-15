import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";
const Login = () => {
  useEffect(() => {
    axios.get("http://localhost:8000/api/login").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <section class="antialiased bg-gradient-to-br from-indigo-100 to-white">
        <div class="container px-6 mx-auto">
          <div class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
            <div class="flex flex-col w-full">
              <div>
                {/* <FontAwesomeIcon size="3x" icon={faPeopleGroup} /> */}
                <img src="/logo.png" className="w-24" alt="" />
              </div>
              <h1 class="text-5xl text-gray-800 font-bold">GestionHR</h1>
              <p class="w-5/12 mx-auto md:mx-0 text-gray-500">
                Inicia sesión para poder gestionar el sistema
              </p>
            </div>
            <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
              <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
                <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">
                  Iniciar Sesión
                </h2>
                <form action="" method="POST" class="w-full">
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="email" class="text-gray-500 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Ingrese su email por favor"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="input" class="flex flex-col w-full my-5">
                    <label for="password" class="text-gray-500 mb-2">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Ingrese su contraseña"
                      class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:shadow-lg"
                    />
                  </div>
                  <div id="button" class="flex flex-col w-full my-5">
                    <button
                      type="submit"
                      class="w-full py-4 bg-indigo-600 rounded-lg text-white"
                    >
                      <div class="flex flex-row items-center justify-center">
                        <div class="mr-2">
                          <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            ></path>
                          </svg>
                        </div>
                        <div class="font-bold">Ingresar</div>
                      </div>
                    </button>
                    <div class="flex justify-evenly mt-5">
                      <a
                        href="#"
                        class="w-full text-center font-medium text-gray-500"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
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
