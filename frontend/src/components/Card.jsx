import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const placeholder = '/placeholder.png'; // Usa questo URL direttamente

export default function Card({ product }) {
  const { addToCart } = useContext(GlobalContext)
  const { user } = useContext(GlobalContext)

  const handleAddToCart = () => {
    console.log("Prodotto prima dell'aggiunta al carrello:", product); // Log del prodotto
    addToCart(product); // Aggiungi il prodotto al carrello
    console.log(`${product.name} aggiunto al carrello`);
  };

  return (

    <div className="card h-75 mt-4" style={{ width: '18rem' }}>
      <img src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : placeholder}
        alt={product.name} className="card-img-top" style={{ height: '50%' }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"><strong>Prezzo:</strong> {product.price}€</p>
        <a
          className={`btn btn-primary ${!user ? 'pointer-events-none opacity-50' : ''}`}
          onClick={user ? handleAddToCart : undefined} title={!user ? 'Accedi per aggiungere al carello' : ''}
        >
          Aggiungi al carrello
        </a>
      </div>
    </div>

  )
}
