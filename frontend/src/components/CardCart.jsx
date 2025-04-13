export default function CardCart({ item, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex">
        <img
          src={product.image ? `http://127.0.0.1:8000/storage/${product.image}` : '/placeholder.png'}
          alt={product.name}
          style={{
            width: '50px',
            height: '50px',
            marginRight: '10px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <div>
          <h3>{product.name}</h3>
          <h6>Prezzo: {product.price}€</h6>
          <p>Quantità: {quantity}</p>
        </div>
      </div>
      <div>
        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Rimuovi</button>
      </div>
    </div>
  );
}
