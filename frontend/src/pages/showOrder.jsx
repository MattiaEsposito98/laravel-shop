import { useState } from "react"
import { useParams } from "react-router-dom"

export default function showOrder() {
  const { id } = useParams()
  const [order, setOrder] = useState([])

  axios.get(`http://localhost:8000/api/orders/${id}`)
    .then(res => {
      setOrder(res.data.data)
      console.log(order)
    })
    .catch(err => {
      console.error(err)
    })

  return (
    <>

    </>
  )
}