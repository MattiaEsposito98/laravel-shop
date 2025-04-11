import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000';

  // Effettua il fetch dei prodotti all'avvio
  useEffect(() => {
    fetchProducts();
  }, []);

  // Recupera l'utente salvato o prova a recuperarlo dal server
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log("Token durante il recupero:", token); // Log del token

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      getUser();
    }
  }, []);

  // Funzione per fetchare i prodotti
  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Errore nel fetch dei prodotti:", err);
    }
  }

  // Funzione per recuperare l'utente
  async function getUser() {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
      console.log("Utente recuperato:", res.data);
    } catch (error) {
      setUser(null);
      console.error("Errore nel recupero dell'utente:", error);
    }
  }

  // Funzione per effettuare il login
  const login = async (email, password) => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Errore durante il login:", error.response || error.message);
    }
  };

  // Funzione per effettuare il logout
  const logout = async () => {
    if (!user) {
      console.error("Utente non autenticato, impossibile effettuare il logout.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Token durante il logout:", token); // Log per debug
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Logout effettuato con successo");
    } catch (error) {
      console.error("Errore durante il logout:", error.response || error.message);
    } finally {
      // Assicurati che tutti i dati siano stati eliminati
      setUser(null);
      localStorage.clear();
      console.log("Dati utente e token rimossi dal sistema.");
    }
  };

  // Funzioni per il carrello
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        products,
        fetchProducts,
        user,
        setUser,
        login,
        logout,
        getUser,
        cart,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
