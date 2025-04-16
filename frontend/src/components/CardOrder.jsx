import { Link, useParams } from "react-router-dom"

export default function CartOrder({ order }) {
  return (
    <>

      <div className="card w-75 mb-3">
        <div className="card-body">
          <h5 className="card-title">Stato: {order.status}</h5>
          {order.products.map(product => (
            <span className="m-1" key={product.id}>

              <Link to={`/product/${product.id}`}>
                • {product.name}
              </Link>
            </span>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <Link to={`/orders/${order.id}`} className="btn btn-primary">
              Dettagli
            </Link> <strong className="card-text">{order.total}€</strong>
          </div>
        </div>
      </div>
    </>
  )
}