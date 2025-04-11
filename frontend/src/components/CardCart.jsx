
export default function CardCart({ item, onRemove }) {

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex">
        <img src={item.image ? `http://127.0.0.1:8000/storage/${item.image}` : '/placeholder.png'} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <div>
          <h3>{item.name}</h3>
          <h6>Prezzo: {item.price}</h6>
        </div>
      </div>
      <div>
        <button className="btn btn-danger" onClick={() => onRemove(item.id)}>Rimuovi</button>
      </div>
    </div>
  );
}
