import React from "react";

import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  let empresa = JSON.parse(localStorage.getItem("empresa"));

  let talento = JSON.parse(localStorage.getItem("talento"));

  const navigate = useNavigate();

  const logout = async () => {
    localStorage.clear();
    navigate("/loginempresa");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">
        <img src="../logo.png" alt="Talentos Reprograma-se" />
      </span>
      <ul className="navbar-nav d-flex ms-auto">
        <li className="nav-item mt-2">
          <NavLink className="nav-link" to="/">
            Oportunidades
          </NavLink>
        </li>
        {talento ? (
          <></>
        ) : (
          <>
            {empresa ? (
              <>
                <li className="dropdown-item">
                  <NavLink className="nav-link" to="/todostalentos">
                    Talentos
                  </NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink
                    className="nav-link"
                    to={`/painelempresa/${empresa.idEmpresa}`}
                  >
                    Painel da Empresa
                  </NavLink>
                </li>
                <li className="dropdown-item">
                  <NavLink
                    className="nav-link"
                    to="/loginEmpresa"
                    onClick={logout}
                  >
                    Sair
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-building-fill-down"></i>
                    Menu Empresa
                  </button>
                  <ul className="dropdown-menu position-absolute">
                    <li className="dropdown-item">
                      <NavLink className="dropdown-link" to="/cadastraempresa">
                        Cadastra-se sua Empresa
                      </NavLink>
                    </li>
                    <li className="dropdown-item">
                      <NavLink className="dropdown-link" to="/loginempresa">
                        Logar como Empresa
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
        {empresa ? (
          <></>
        ) : (
          <>
            {talento ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mt-2"
                    to={`/perfiltalento/${talento.idTalento}`}
                  >
                    Painel de Talento
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mt-2"
                    to="/logintalento"
                    onClick={logout}
                  >
                    Sair
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-down"></i>
                    Menu Talento
                  </button>
                  <ul className="dropdown-menu position-absolute">
                    <li className="dropdown-item">
                      <NavLink className="dropdown-link" to="/cadastratalento">
                        Cadastra-se como Talento
                      </NavLink>
                    </li>
                    <li className="dropdown-item">
                      <NavLink className="dropdown-link" to="/logintalento">
                        Logar como Talento
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
