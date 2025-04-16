import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import CardCart from "../components/CardCart";
import axios from "axios";
import Loader from "../components/Loader";
import Swal from 'sweetalert2';


export default function Cart() {
  const { cart, removeFromCart, clearCart, fetchCart, loading, showLoader, hideLoader, addToCart, showAlert } = useContext(GlobalContext);
  console.log("Cart:", cart);

  // Funzione per calcolare il totale
  const calculateTotalPrice = (cart) => {

    return cart.reduce((total, item) => {
      const price = parseFloat(item.product?.price ?? 0);
      return total + price * item.quantity;
    }, 0);
  };

  // Funzione per svuotare il carrello
  const handleClearCart = async () => {
    showLoader(); // ✅ Mostra il loader prima di avviare la richiesta
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
      clearCart(); // ✅ Puliamo il carrello nella UI
    } catch (err) {
      console.error('Errore durante lo svuotamento del carrello:', err.response ? err.response.data : err.message);
    } finally {
      hideLoader(); // ✅ Nasconde il loader alla fine
    }
  };

  // Funzione per effettuare l'acquisto
  const handleBuy = async () => {
    const result = await Swal.fire({
      title: 'Sei sicuro?',
      text: "Vuoi davvero completare l'acquisto?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sì, acquista!',
      cancelButtonText: 'Annulla',
      position: 'center',
    });

    if (result.isConfirmed) {
      showLoader(); // ✅ Mostra il loader
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
        showAlert({
          title: "Ordine completato",
          text: "Grazie per l'acquisto!",
          icon: "success",
        });
        clearCart();     // ✅ Svuota il carrello nella UI
        fetchCart();     // ✅ Aggiorna i dati con quelli da backend
      } catch (err) {
        console.error("Errore nella creazione dell'ordine:", err.response ? err.response.data : err.message);
      } finally {
        hideLoader(); // ✅ Nasconde il loader alla fine
      }
    }
  };


  return (
    <>

      {loading && <Loader />}
      {loading ||
        <div className="container">
          <h1>Carrello</h1>
          <div className="row">
            {cart.length === 0 ? (
              <p>Il carrello è vuoto</p>
            ) : (
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item mb-2">
                    <CardCart item={item} onRemove={removeFromCart} addToCart={addToCart} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cart.length > 0 && (
            <div className="mt-3">
              <div className="d-flex gap-2">
                <button className="btn btn-warning" onClick={handleClearCart}>
                  Svuota Carrello
                </button>
                <button className="btn btn-success" onClick={handleBuy}>Compra</button>
              </div>
              <h3 className="mt-3">Totale: {calculateTotalPrice(cart).toFixed(2)}€</h3>
            </div>
          )}
        </div>
      }

    </>
  );
}
