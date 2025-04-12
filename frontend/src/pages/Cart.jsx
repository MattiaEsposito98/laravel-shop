import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardCart from "../components/CardCart";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(GlobalContext);

  // Funzione per calcolare il totale
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.product.data.price) * item.quantity), 0);
  };


  const handleBuy = async () => {
    const token = localStorage.getItem('token');
    const totalPrice = calculateTotalPrice();  // Funzione che calcola il prezzo totale

    try {
      const response = await axios.post(
        'http://localhost:8000/api/order',
        { total_price: totalPrice },  // Passa il total_price calcolato
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      console.log('Ordine creato:', response.data);
    } catch (err) {
      console.error('Errore nella creazione dell\'ordine:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container">
      <h1>Carrello</h1>
      <div className="row">
        {cart.length === 0 ? (
          <p>Il carrello è vuoto</p>
        ) : (
          <ul className="list-group">
            {cart.map(item => (
              <li key={item.id} className="list-group-item mb-2">
                <CardCart item={item} onRemove={removeFromCart} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <div>
          <button className="btn btn-secondary mt-3" onClick={clearCart}>Svuota Carrello</button>
          <button onClick={handleBuy}>Compra</button>
          <h3>Totale: {calculateTotalPrice()}€</h3>
        </div>
      )}
    </div>
  );
}
