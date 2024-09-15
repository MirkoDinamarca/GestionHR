import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RutaProtegida from "./layouts/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import Usuarios from "./pages/Usuarios";
import NuevoUsuario from "./pages/NuevoUsuario";
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        {/* -- RUTAS PUBLICAS -- */}
        <Route path="/">
          <Route index element={<Login />} />

        </Route>

        {/* -- RUTAS PRIVADAS -- */}

        {/* Dashboard */}
        <Route path="/inicio" element={<RutaProtegida />}>
          <Route index element={<Dashboard />} />
        </Route>

        {/* Usuarios / Empleados */}
        <Route path="/usuarios" element={<RutaProtegida />}>
          <Route index element={<Usuarios />} />
          <Route path="nuevo-usuario" element={<NuevoUsuario />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
