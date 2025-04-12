export default function CardCart({ item, onRemove }) {
  const { product, quantity } = item;
  const productDetails = product.data; // Accedi ai dettagli del prodotto tramite `product.data`

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex">
        <img
          src={productDetails.image ? `http://127.0.0.1:8000/storage/${productDetails.image}` : '/placeholder.png'}
          alt={productDetails.name}
          style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div>
          <h3>{productDetails.name}</h3>
          <h6>Prezzo: {productDetails.price}€</h6>
          <p>Quantità: {quantity}</p>
        </div>
      </div>
      <div>
        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Rimuovi</button>
      </div>
    </div>
  );
}
