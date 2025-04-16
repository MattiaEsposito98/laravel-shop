import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

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

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    } else {
      getUser();
    }
  }, []);

  // 🔄 Quando l'utente è settato, carica il carrello
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  // Funzione per settare il loader
  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  // Funzione per fetchare i prodotti
  async function fetchProducts() {
    showLoader();  // Mostra il loader
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Errore nel fetch dei prodotti:", err);
    } finally {
      hideLoader();  // Nascondi il loader dopo il fetch
    }
  }

  // Funzione per recuperare l'utente
  async function getUser() {
    showLoader();  // Mostra il loader
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
      console.log("Utente recuperato:", res.data);
    } catch (error) {
      setUser(null);
      console.error("Errore nel recupero dell'utente:", error);
    } finally {
      hideLoader();  // Nascondi il loader dopo il fetch
    }
  }

  // Funzione per effettuare il login
  const login = async (email, password) => {
    showLoader();  // Mostra il loader
    try {
      await axios.get('/sanctum/csrf-cookie');
      const response = await axios.post('/api/login', { email, password });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      fetchCart();
    } catch (error) {
      console.error("Errore durante il login:", error.response || error.message);
    } finally {
      hideLoader();  // Nascondi il loader dopo il login
    }
  };

  // Funzione per effettuare il logout
  const logout = async () => {
    if (!user) {
      console.error("Utente non autenticato, impossibile effettuare il logout.");
      return;
    }

    showLoader();  // Mostra il loader
    try {
      const token = localStorage.getItem("token");
      console.log("Token durante il logout:", token); // Log per debug
      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(null); // Rimuove i dati utente dal contesto
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      console.log("Logout effettuato con successo");

      // Rimuovi il carrello dal contesto
      clearCart();
      fetchCart();
    } catch (error) {
      console.error("Errore durante il logout:", error.response || error.message);
    } finally {
      // Assicurati che tutti i dati siano stati eliminati
      setUser(null);
      localStorage.clear();
      console.log("Dati utente e token rimossi dal sistema.");
      hideLoader();  // Nascondi il loader
    }
  };

  // Funzione per recuperare il carrello
  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart-items', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Ora ogni item ha già product
      setCart(response.data);
    } catch (error) {
      console.error('Errore nel recupero del carrello:', error);
    }
  };

  // Funzioni aggiungere prodotti al carrello
  const addToCart = async (product) => {

    try {
      await axios.post(
        '/api/cart-items',
        { product_id: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Prodotto aggiunto al carrello");

      await fetchCart();
      alert('🛒 Prodotto aggiunto al carrello');
    } catch (err) {
      console.error("Errore nell'aggiungere al carrello:", err);
    }
  };

  // Rimuovi prodotti
  const removeFromCart = async (productId) => {
    showLoader();  // Mostra il loader
    try {
      await axios.delete(
        `/api/cart-items/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: 'application/json',
          },
        }
      );
      console.log("Prodotto rimosso dal carrello");

      // 🔁 Aggiorna il carrello
      await fetchCart();
    } catch (err) {
      console.error("Errore nel rimuovere dal carrello:", err);
    } finally {
      hideLoader();  // Nascondi il loader
    }
  };

  // Pulisci carello
  const clearCart = () => {
    setCart([]); // Pulisce il carrello in locale
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
        fetchCart,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        loading,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
