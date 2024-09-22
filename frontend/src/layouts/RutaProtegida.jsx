import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
const RutaProtegida = () => {
  const { auth, loading } = useAuth();
  if (loading) return "Cargando...";
  
  return (
    <>
      {auth && auth.id ? (
        <main className="grid grid-cols-5">
          <Sidebar />
          <div className="h-screen m-0 p-5 col-span-4">
            <div className="bg-white shadow-lg shadow-blue-200 border rounded-xl h-full overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </main>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default RutaProtegida;
