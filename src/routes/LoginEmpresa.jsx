import React, { useState } from "react";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetchJSON from "../axios/config-json";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import { Link, useNavigate } from "react-router-dom";

import "./LoginEmpresa.css";

const LoginEmpresa = () => {
  const navigate = useNavigate();

  const [emailEmpresa, setEmailEmpresa] = useState("");

  const [senhaEmpresa, setSenhaEmpresa] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let empresa = {
      emailEmpresa,
      senhaEmpresa,
    };

    await bancoTalentosFetchJSON
      .post("/loginempresa", empresa)
      .then((res) => {
        let empresa = res.data;
        useToast(res.data.message);

        localStorage.setItem("empresa", JSON.stringify(empresa));

        window.location.replace("/");

        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center py-3">Login Empresa</h1>
      <div className="row g-3">
        <div className="col-6 offset-3">
          <label className="form-label" htmlFor="emailEmpresa">
            E-mail da Empresa
          </label>
          <input
            className="form-control"
            type="email"
            name="emailEmpresa"
            id="emailEmpresa"
            onChange={(e) => setEmailEmpresa(e.target.value)}
            placeholder="Insira o e-mail cadastrado.."
          />
        </div>
        <div className="col-6 offset-3">
          <label className="form-label" htmlFor="senhaEmpresa">
            Senha da Empresa
          </label>
          <input
            className="form-control"
            type="password"
            name="senhaEmpresa"
            id="senhaEmpresa"
            onChange={(e) => setSenhaEmpresa(e.target.value)}
            placeholder="Insira a senha cadastrada.."
          />
          <small>Esqueceu a senha? Clique aqui!</small>
        </div>
      </div>
      <input
        className="btn-geral offset-3 my-3"
        type="submit"
        value="Login no sistema"
      />
      <p className="offset-3">
        Não possui cadastro no nosso sistema?{" "}
        <Link to="/cadastraempresa">
          <span>Cliqui aqui!</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginEmpresa;
