import React, { useState } from "react";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetchJSON from "../axios/config-json";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import { useNavigate, Link } from "react-router-dom";

import "./LoginTalento.css";

const LoginTalento = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let talento = {
      email,
      senha,
    };

    await bancoTalentosFetchJSON
      .post("/logintalento", talento)
      .then((res) => {
        let talento = res.data;

        useToast(res.data.message);

        localStorage.setItem("talento", JSON.stringify(talento));

        window.location.replace("/");

        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center py-3">Login como Talento</h1>
      <div className="row g-3">
        <div className="col-6 offset-3">
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira o seu e-mail de cadastro..."
          />
        </div>
        <div className="col-6 offset-3">
          <label className="form-label" htmlFor="senha">
            Senha
          </label>
          <input
            className="form-control"
            type="password"
            name="senha"
            id="senha"
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Insira a sua senha de cadastro..."
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
        <Link to="/cadastratalento">
          <span>Cliqui aqui!</span>
        </Link>
      </p>
    </form>
  );
};

export default LoginTalento;
