const placeholder = '/placeholder.png'; // Usa questo URL direttamente

export default function Card({ product }) {


  return (

    <div className="card h-75 mt-4" style={{ width: '18rem' }}>
      <img src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : placeholder}
        alt={product.name} className="card-img-top" style={{ height: '50%' }} />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text"><strong>Prezzo:</strong> {product.price}€</p>
        <a href="#" className="btn btn-primary">Aggiungi al carello</a>
      </div>
    </div>

  )
}
