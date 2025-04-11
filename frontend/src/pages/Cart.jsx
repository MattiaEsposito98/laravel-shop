import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardCart from "../components/CardCart"; // Importa il componente CardCart

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(GlobalContext);

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
                <CardCart item={item} onRemove={removeFromCart} /> {/* Passa la funzione onRemove */}
              </li>
            ))}
          </ul>
        )}
      </div>
      {cart.length > 0 && (
        <button className="btn btn-secondary mt-3" onClick={clearCart}>Svuota Carrello</button>
      )}
    </div>
  );
}
