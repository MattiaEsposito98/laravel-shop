import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShowOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/orders/${id}`)
      .then(res => {
        setOrder(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5"><p>Caricamento in corso...</p></div>;
  if (!order) return <div className="text-center mt-5"><p>Ordine non trovato</p></div>;

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-primary">Dettagli Ordine #{order.id}</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <p><strong>Stato:</strong> <span className="badge bg-success">{order.status}</span></p>
          <p><strong>Utente:</strong> {order.user.name}</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <h4 className="mb-3">Prodotti:</h4>
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Quantità</th>
                <th>Prodotto</th>
                <th>Prezzo</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map(product => (
                <tr key={product.id}>
                  <td>{product.pivot.quantity}</td>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col text-end">
          <p className="fs-3"><strong>Totale:</strong> {order.total}€</p>
        </div>
      </div>
    </div>
  );
}
