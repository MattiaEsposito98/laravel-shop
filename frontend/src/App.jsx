import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
import GlobalProvider from "./context/GlobalContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import Homepage from "./pages/Homepage"
import Login from "./components/Login"
import Register from "./components/Register"



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
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
