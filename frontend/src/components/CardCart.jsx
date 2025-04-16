import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function CardCart({ item, onRemove, addToCart }) {
  const { product, quantity } = item;
  const { fetchCart } = useContext(GlobalContext);

  function decrease(product) {
    const token = localStorage.getItem("token");
    axios.patch(
      `http://localhost:8000/api/cart-items/${product.id}`,
      {}, // corpo vuoto
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    )
      .then(res => fetchCart())
      .catch(err => console.error('Errore nella rimozione:', err));
  }

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-auto">
          <img
            src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : '/placeholder.png'}
            alt={product.name}
            className="img-fluid rounded-start ms-1"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        </div>
        <div className="col">
          <div className="card-body py-2 px-3">
            <h5 className="card-title mb-1">{product.name}</h5>
            <p className="card-text mb-1 text-muted">Prezzo: {product.price}€</p>
            <p className="card-text mb-2 d-flex align-items-center gap-2">
              Quantità:
              <button
                className="btn btn-outline-danger btn-sm rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "32px", height: "32px" }}
                onClick={() => decrease(product)}
              >
                −
              </button>
              <span className="fw-bold">{quantity}</span>
              <button
                className="btn btn-outline-success btn-sm rounded-circle d-flex justify-content-center align-items-center"
                style={{ width: "32px", height: "32px" }}
                onClick={() => addToCart(product)}
              >
                +
              </button>
            </p>



          </div>
        </div>
        <div className="col-auto me-3">
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onRemove(item.id)}
          >
            Rimuovi
          </button>
        </div>
      </div>
    </div>
  );
}
