import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CartOrder from "../components/cardOrder";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../components/Loader";

export default function Order() {
  const { loading, showLoader, hideLoader } = useContext(GlobalContext);

  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    showLoader(); // ✅ Attiva il loader
    axios.get("http://localhost:8000/api/userOrders", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      withCredentials: true,
    })
      .then(res => {
        console.log(res.data.data);
        setOrders(res.data.data);
      })
      .catch(err => {
        console.error("Errore nella richiesta:", err.response);
      })
      .finally(() => {
        hideLoader(); // ✅ Disattiva il loader
      });
  }, []);

  return (
    <>
      {loading && <Loader />}

      {loading ||
        <div className="container">
          <h1 className="my-4">I tuoi ordini: {orders.length}</h1>
          {orders.length > 0 ?
            orders.map(order => (
              <div className="row justify-content-center" key={order.id}>
                <div className="col-md-6">
                  <CartOrder order={order} />
                </div>
              </div>
            )) :
            <p>Nessun ordine presente</p>
          }
        </div>}

    </>
  );
}
