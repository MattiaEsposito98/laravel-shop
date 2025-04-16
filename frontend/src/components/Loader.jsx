import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function Loader() {
  const { loading } = useContext(GlobalContext);

  if (!loading) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-light bg-opacity-50">
      <div className="d-flex">
        <div className="spinner-grow text-primary" role="status"></div>
        <div className="spinner-grow text-secondary" role="status"></div>
        <div className="spinner-grow text-success" role="status"></div>
        <div className="spinner-grow text-danger" role="status"></div>
        <div className="spinner-grow text-warning" role="status"></div>
        <div className="spinner-grow text-info" role="status"></div>
        <div className="spinner-grow text-light" role="status"></div>
        <div className="spinner-grow text-dark" role="status"></div>
      </div>
      <p className="mt-3 fw-bold text-dark">Caricamento in corso...</p>
    </div>
  );
}
