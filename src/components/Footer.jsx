import React from "react";

import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row w-50 m-auto">
        <div className="col-12">
          <p className="text-center py-3">
            &copy; 2023 - Banco de Talentos Reprograma-se <br /> Todos os
            direitos reservados{" "}
          </p>

          <p className="text-center">
            Desenvolvidor por{" "}
            <Link to="https://www.linkedin.com/in/caioroberto-dev-web">
              Caio Roberto
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
