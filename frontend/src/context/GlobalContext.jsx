import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([])


  useEffect(() => {
    fetchproducts()
  }, [])


  function fetchproducts() {
    axios.
      get('http://localhost:8000/api/products')
      .then(res => {
        console.log(res.data.data)
        setProducts(res.data.data)
      }
      )

      .catch(err => console.error(err)
      )
  }



  return (
    <>
      <GlobalContext.Provider value={{ fetchproducts, products }}>
        {children}
      </GlobalContext.Provider>

    </>
  )
}