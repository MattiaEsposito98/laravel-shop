import React from "react";

const Footer = () => {
  return (
    <footer className="bg-info" style={{ padding: "20px", textAlign: "center" }}>
      <p>&copy; {new Date().getFullYear()} Nome dell'Azienda. Tutti i diritti riservati.</p>
      <p>
        Indirizzo: Via Esempio, 123, 80021 Afragola, Campania, Italia
        <br />
        Telefono: +39 081 1234567 | Email: info@esempio.it
      </p>
      <p>
        Seguici sui social:{" "}
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>,{" "}
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>,{" "}
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </footer>
  );
};

export default Footer;
