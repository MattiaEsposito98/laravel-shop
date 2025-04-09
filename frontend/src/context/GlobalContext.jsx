import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  // Impostazioni globali di axios per includere i cookie
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000';

  useEffect(() => {
    fetchProducts();
    getUser(); // verifica se l'utente è già loggato (cookie esistente)
  }, []);

  function fetchProducts() {
    axios
      .get("/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.error(err));
  }

  async function getUser() {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
    } catch (error) {
      setUser(null); // se non è loggato o c'è errore
    }
  }

  async function login(email, password) {
    try {
      await axios.get("/sanctum/csrf-cookie"); // richiede il cookie CSRF
      await axios.post("/login", { email, password });
      await getUser(); // aggiorna stato user
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await axios.post("/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        products,
        fetchProducts,
        user,
        login,
        logout,
        getUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
