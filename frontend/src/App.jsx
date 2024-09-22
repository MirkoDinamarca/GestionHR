import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import NuevoUsuario from "./pages/NuevoUsuario";
import { AuthProvider } from "./context/AuthProvider";
import Empleados from "./pages/Usuarios";
import ListaUsuario from "./pages/listaUsuario.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* -- RUTAS PUBLICAS -- */}
          <Route path="/login">
            <Route index element={<Login />} />
          </Route>

          

          {/* -- RUTAS PRIVADAS -- */}

          {/* Dashboard */}
          <Route path="/" element={<RutaProtegida />}>
            <Route index element={<Dashboard />} />
          </Route>

          {/* Usuarios / Empleados */}
          
        
            <Route path="nuevo-usuario" element={<NuevoUsuario />} />

           
            <Route path="usuario-historico" element={<Empleados/>} />

             <Route path="usuario/:id" element={<ListaUsuario />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
