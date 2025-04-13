export default function CardCart({ item, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0 align-items-center">
        <div className="col-auto">
          <img
            src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : '/placeholder.png'}
            alt={product.name}
            className="img-fluid rounded-start"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        </div>
        <div className="col">
          <div className="card-body py-2 px-3">
            <h5 className="card-title mb-1">{product.name}</h5>
            <p className="card-text mb-1 text-muted">Prezzo: {product.price}€</p>
            <p className="card-text mb-2">Quantità: {quantity}</p>
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
