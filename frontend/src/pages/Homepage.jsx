import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Card from "../components/Card"

export default function Homepage() {
  const { products } = useContext(GlobalContext)

  return (
    <div className="container">
      <h1>Homepage</h1>
      <div className="row">
        <div className="col mb-3">
          <ul>
            {products.map(product => (
              <li key={product.id}><Card product={product} /></li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  )
}