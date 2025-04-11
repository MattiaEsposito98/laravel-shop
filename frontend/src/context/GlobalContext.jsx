import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:8000';

  // Effettua il fetch dei prodotti all'avvio
  useEffect(() => {
    fetchProducts(); // Carica i prodotti quando il componente viene montato
  }, []);

  // Recupera l'utente salvato o prova a recuperarlo dal server
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Recupera l'utente salvato
    } else {
      getUser(); // Prova a recuperare l'utente dal server
    }
  }, []);

  // Funzione per fetchare i prodotti
  async function fetchProducts() {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  // Funzione per recuperare l'utente
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

  // Funzione per effettuare il login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token); // Salva il token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Salva l'utente
    } catch (error) {
      console.error("Errore durante il login:", error);
    }
  };

  // Funzione per effettuare il logout
  const logout = async () => {
    try {
      // Aggiungi il token di accesso nell'intestazione di autorizzazione
      const token = localStorage.getItem("token"); // Assicurati di avere il token salvato
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}` // Includi il token nell'intestazione
        }
      });
      setUser(null); // Resetta lo stato dell'utente
      localStorage.removeItem("user"); // Rimuovi l'utente dai dati locali
      localStorage.removeItem("token"); // Rimuovi il token dai dati locali
      console.log("Logout effettuato con successo");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Log dell'utente aggiornato
  useEffect(() => {
    console.log("Utente aggiornato:", user);
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
