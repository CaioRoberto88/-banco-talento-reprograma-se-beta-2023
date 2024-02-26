import React, { useState } from "react";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetch from "../axios/config";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import { useNavigate, Link } from "react-router-dom";

import "./CadastraEmpresa.css";

const CadastraEmpresa = () => {
  const navigate = useNavigate();

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [tipoEmpresa, setTipoEmpresa] = useState("");
  const [emailEmpresa, setEmailEmpresa] = useState("");
  const [image, setImage] = useState("");
  const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
  const [senhaEmpresa, setSenhaEmpresa] = useState("");
  const [confirmaSenhaEmpresa, setConfirmaSenhaEmpresa] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empresa = {
      nomeEmpresa,
      tipoEmpresa,
      emailEmpresa,
      image,
      descricaoEmpresa,
      senhaEmpresa,
      confirmaSenhaEmpresa,
    };

    const formData = new FormData();

    Object.keys(empresa).forEach((key) => {
      formData.append(key, empresa[key]);
    });

    await bancoTalentosFetch
      .post("/cadastroempresa", formData)
      .then((res) => {
        useToast(res.data.message);
        navigate("/loginempresa");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center py-3">Cadastre sua Empresa!</h1>
      <div className="row g-3">
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="nomeEmpresa">
            Nome da Empresa
          </label>
          <input
            className="form-control"
            type="text"
            name="nomeEmpresa"
            id="nomeEmpresa"
            onChange={(e) => setNomeEmpresa(e.target.value)}
            placeholder="Insira o nome da sua empresa..."
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="tipoEmpresa">
            Tipo da Empresa
          </label>
          <input
            className="form-control"
            type="text"
            name="tipoEmpresa"
            id="tipoEmpresa"
            onChange={(e) => setTipoEmpresa(e.target.value)}
            placeholder="Insira o tipo da sua empresa..."
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="emailEmpresa">
            E-mail da Empresa
          </label>
          <input
            className="form-control"
            type="email"
            name="emailEmpresa"
            id="emailEmpresa"
            onChange={(e) => setEmailEmpresa(e.target.value)}
            placeholder="Insira o e-mail da sua empresa..."
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="image">
            Imagem da Empresa
          </label>
          <input
            className="form-control"
            type="file"
            name="image"
            id="image"
            onChange={onFileChange}
          />
          <small className="dica">
            *A imagem deve ter tamanho máximo de 10 mb.
          </small>
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="descricaoEmpresa">
            Descrição da Empresa
          </label>
          <textarea
            className="form-control"
            name="descricaoEmpresa"
            id="descricaoEmpresa"
            onChange={(e) => setDescricaoEmpresa(e.target.value)}
            placeholder="Insira uma breve descricao da sua empresa..."
          ></textarea>
        </div>
        <div className="row g-3">
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="senhaEmpresa">
              Senha da Empresa
            </label>
            <input
              className="form-control"
              type="password"
              name="senhaEmpresa"
              id="senhaEmpresa"
              onChange={(e) => setSenhaEmpresa(e.target.value)}
              placeholder="Insira uma senha de acesso para sua empresa..."
            />
            <small className="dica">
              *A senha deve ter pelo menos um caractere especial, uma letra e um
              número.
            </small>
          </div>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="confirmaSenhaEmpresa">
              Confirmação de Senha
            </label>
            <input
              className="form-control"
              type="password"
              name="confirmaSenhaEmpresa"
              id="confirmaSenhaEmpresa"
              onChange={(e) => setConfirmaSenhaEmpresa(e.target.value)}
              placeholder="Confirme a senha de acesso para sua empresa..."
            />
          </div>
        </div>
      </div>
      <input
        className="btn-geral my-3"
        type="submit"
        value="Finalizar cadastro"
      />
      <p>
        Já possui cadastro?{" "}
        <Link to="/loginempresa">
          <span>Cliqui aqui!</span>
        </Link>
      </p>
    </form>
  );
};

export default CadastraEmpresa;
