import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000';

  useEffect(() => {
    fetchProducts(); // Carica i prodotti quando il componente viene montato
  }, [user]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Recupera l'utente salvato
    } else {
      getUser(); // Prova a recuperare l'utente dal server
    }
  }, []);


  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getUser() {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data); // Aggiorna lo stato dell'utente
      console.log("Utente recuperato:", res.data); // Log dei dati recuperati
    } catch (error) {
      setUser(null); // Se non è loggato o c'è errore
      console.error("Errore nel recupero dell'utente:", error);
    }
  }


  async function login(email, password) {
    try {
      await axios.get("/sanctum/csrf-cookie"); // richiede il cookie CSRF
      const response = await axios.post("/login", { email, password });

      if (response.status === 200) {
        console.log("Login effettuato:", response.data.user); // Log dei dati dell'utente
        setUser(response.data.user); // Imposta l'utente nello stato
        return response.data; // Restituisci i dati se necessario
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      throw new Error(error.response?.data?.message || "Errore di login");
    }
  }


  async function logout() {
    if (!user) {
      console.error("Nessun utente autenticato, impossibile effettuare il logout");
      return;
    }
    try {
      await axios.get("/sanctum/csrf-cookie"); // Richiesta del cookie CSRF
      await axios.post("/api/logout"); // Logout
      setUser(null); // Resetta lo stato dell'utente nel contesto
      console.log("Logout effettuato con successo");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  }


  useEffect(() => {
    console.log("Utente aggiornato:", user); // Aggiungi questo log
  }, [user]);


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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
