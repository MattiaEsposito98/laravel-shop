import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import GlobalProvider from "./context/GlobalContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Homepage from "./pages/Homepage"
import Login from "./components/Login"
import Register from "./components/Register"
import Cart from "./pages/Cart"
import Order from "./pages/Order"
import ShowOrder from "./pages/showOrder"



function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={DefaultLayout}>
              <Route index Component={Homepage}></Route>
              <Route path="/login" Component={Login}></Route>
              <Route path="/register" Component={Register}></Route>
              <Route path="cart" Component={Cart}></Route>
              <Route path="order" Component={Order}></Route>
              <Route path="/orders/:id" element={<ShowOrder />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider >
    </>
  )
}

export default App
