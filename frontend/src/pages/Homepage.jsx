import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Card from "../components/Card"

export default function Homepage() {
  const { products } = useContext(GlobalContext)
  const [currentPage, setCurrentPage] = useState(1); // Iniziamo dalla prima pagina
  const [productsPerPage] = useState(6); // Mostriamo 6 prodotti per pagina (puoi cambiare questo numero)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container">
      <h1>Homepage</h1>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
