import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Se crea un context para poder comunicar un componente a través de la jerarquía de los componentes secundarios
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      const usuario = response.data.usuario;

      if (usuario) {
        setToken(token);
        localStorage.setItem("token", token);
        setAuth(usuario);
        navigate("/");
      } else {
        setAuth({ error: response.data.mensaje });
        setLoading(false);
      }

    } catch (error) {
      console.log('Error desde el catch', error.response.data.mensaje)
      setAuth({ error: error.response?.data?.mensaje || "Error de autenticación" });	
      setLoading(false);
    }
  };

  // Cerrar sesión
  const logout = () => {
    setToken(null);
    setAuth({});
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setAuth(response.data.usuario);
        } catch (error) {
          console.log('Error ', error)
          setAuth({});
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, [token]) 

  
  return (
    <AuthContext.Provider value={{ auth, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
