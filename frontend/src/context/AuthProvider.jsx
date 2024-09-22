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
      setToken(token);
      localStorage.setItem("token", token);
      setAuth(response.data.usuario);
      navigate("/");
    } catch (error) {
      setAuth({});
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
