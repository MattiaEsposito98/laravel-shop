import axios from "axios";
import { useEffect, useState } from "react";
import CartOrder from "../components/cardOrder";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="my-4">I tuoi ordini: {orders.length}</h1>
        {orders.length > 0 ?
          orders.map(order => (
            <div className="row justify-content-center" key={order.id}>
              <div className="col-md-6"> {/* Modifica qui */}
                <CartOrder order={order} />
              </div>
            </div>
          )) :
          <p>Nessun ordine presente</p>
        }
      </div>

    </>

  )
}
