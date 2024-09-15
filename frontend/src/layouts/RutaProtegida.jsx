import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
const RutaProtegida = () => {
  return (
      <main className="grid grid-cols-5">
        <Sidebar />
        <div className="h-screen m-0 p-5 col-span-4">
          <div className="bg-white shadow-lg shadow-blue-200 border rounded-xl h-full">
            <Outlet/>
          </div>
        </div>
      </main>
  );
};

export default RutaProtegida;
