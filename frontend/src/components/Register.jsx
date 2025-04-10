import axios from "axios";
import { useState } from "react";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);

  function handleFormData(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.password === formData.password_confirmation) {
      axios.post(`http://localhost:8000/api/register/user`, formData)
        .then(res => {
          console.log('Dati inviati:', res.data);
          setFormData(initialFormData);
        })
        .catch(err => {
          console.error(err);
          alert('Errore nella registrazione: ' + (err.response.data.message || 'Controlla i dettagli e riprova.'));
        });
    } else {
      alert('Le password non corrispondono');
    }
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <form className="w-50 d-flex flex-column justify-content-center align-items-center" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={formData.email}
            onChange={handleFormData}
            required
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleFormData}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmed_password" className="form-label">Conferma password</label>
          <input
            type="password"
            className="form-control"
            id="confirmed_password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleFormData}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Registrati</button>
      </form>
    </div>
  );
}
