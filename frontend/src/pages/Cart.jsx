import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardCart from "../components/CardCart";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart, clearCart, fetchCart } = useContext(GlobalContext);
  console.log("Cart:", cart);

  // Funzione per calcolare il totale
  const calculateTotalPrice = (cart) => {
    if (!Array.isArray(cart)) return 0;

    return cart.reduce((total, item) => {
      const price = parseFloat(item.product?.price ?? 0);
      return total + price * item.quantity;
    }, 0);
  };

  // Funzione per svuotare il carrello
  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem('token');

      // Effettua la richiesta per svuotare il carrello
      const response = await axios.delete('http://localhost:8000/api/clear-cart', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Carrello svuotato:', response.data);
      // Puoi anche chiamare clearCart dal context per rimuoverlo dalla UI
      clearCart();
    } catch (err) {
      console.error('Errore durante lo svuotamento del carrello:', err.response ? err.response.data : err.message);
    }
  };

  const handleBuy = async () => {
    let text = 'Sei sicuro dell\'acquisto';
    if (confirm(text) == true) {
      const token = localStorage.getItem("token");
      const totalPrice = calculateTotalPrice(cart);

      try {
        const response = await axios.post(
          "http://localhost:8000/api/order",
          { total_price: totalPrice },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Ordine creato:", response.data);

        clearCart();     // svuota il carrello nella UI
        fetchCart();     // aggiorna i dati con quelli da backend
      } catch (err) {
        console.error("Errore nella creazione dell'ordine:", err.response ? err.response.data : err.message);
      }
    } else return
  }



  return (
    <div className="container">
      <h1>Carrello</h1>
      <div className="row">
        {cart.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item mb-2">
                <CardCart item={item} onRemove={removeFromCart} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div>
          <div className="d-flex gap-2">
            <button className="btn btn-warning" onClick={handleClearCart}>
              Svuota Carrello
            </button>
            <button className="btn btn-success" onClick={handleBuy}>Compra</button>
          </div>
          <h3>Totale: {calculateTotalPrice(cart)}€</h3>
        </div>
      )}
    </div>
  );
}
