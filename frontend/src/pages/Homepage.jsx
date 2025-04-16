import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function Homepage() {
  const { products, loading, showLoader, hideLoader } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


  // Numero totale delle pagine
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <>
      {loading && <Loader />}
      {loading ||
        <div className="container d-flex flex-column min-vh-100 ">
          <div className="row flex-grow-1 justify-content-center  align-items-start">
            {currentProducts.map(product => (
              <div className="col-lg-4 col-sm-6 mb-3 d-flex justify-content-center" key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>

          <div className="pagination justify-content-center mb-3">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`page-link ${currentPage === number ? 'active' : ''}`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>}

    </>
  );
}