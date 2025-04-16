import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout, cart } = useContext(GlobalContext);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);


  return (
    <nav className="navbar navbar-expand-lg bg-info">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {user ? `${user.name}` : 'Guest'}
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            {!user && (
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
            )}

            {user && (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => { logout() }}>
                  Logout
                </button>
              </li>
            )}
            {!user &&
              <Link to={'/register'} className="nav-link">Registrati</Link>
            }
            <li className="nav-item">
              <Link className="nav-link" to='order'>Ordini </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                Carrello
                <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                  <span className="visually-hidden">carrelli</span> {/* Per l'accessibilità */}
                </span>
              </Link>

            </li>


          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
