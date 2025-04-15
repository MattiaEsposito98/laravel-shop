import axios from "axios";
import { useEffect, useState } from "react";

export default function Order() {
  const [order, setOrder] = useState([]);
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
        setOrder(res.data.data);
      })
      .catch(err => {
        console.error("Errore nella richiesta:", err.response);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1>I tuoi ordini: {order.length}</h1>
        <
      </div>
    </>

  )
}
