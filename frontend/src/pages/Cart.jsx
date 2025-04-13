import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardCart from "../components/CardCart";
import axios from "axios";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(GlobalContext);

  console.log("Cart:", cart);

  // Funzione per calcolare il totale
  const calculateTotalPrice = () =>
    Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + (parseFloat(item.product?.price || 0) * item.quantity), 0)
      : 0;

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    const totalPrice = calculateTotalPrice();

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
    } catch (err) {
      console.error(
        "Errore nella creazione dell'ordine:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Carrello</h1>

      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li key={item.id} className="list-group-item mb-2">
                <CardCart item={item} onRemove={removeFromCart} />
              </li>
            ))}
          </ul>

          <div className="mt-4 mb-3">
            <h4>Totale: {calculateTotalPrice().toFixed(2)} €</h4>
            <button className="btn btn-secondary me-2" onClick={clearCart}>
              Svuota Carrello
            </button>
            <button className="btn btn-primary " onClick={handleBuy}>
              Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
