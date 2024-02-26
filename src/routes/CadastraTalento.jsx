import React, { useState } from "react";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetch from "../axios/config";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import { Link, useNavigate } from "react-router-dom";

import "./CadastraTalento.css";

const CadastraTalento = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [redesSociais, setRedesSociais] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [conhecimentos, setConhecimentos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const talento = {
      nome,
      email,
      redesSociais,
      experiencia,
      conhecimentos,
      descricao,
      image,
      senha,
      confirmaSenha,
    };

    const formData = new FormData();

    Object.keys(talento).forEach((key) => {
      formData.append(key, talento[key]);
    });

    await bancoTalentosFetch
      .post("/cadastrotalento", formData)
      .then((res) => {
        useToast(res.data.message);
        navigate("/logintalento");
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
      <h1 className="text-center pt-3">Faça seu Cadastro!</h1>
      <p className="text-center pb-3">
        E seja o talento que as empresas precisavam!
      </p>
      <div className="row g-3">
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="nome">
            Nome Completo
          </label>
          <input
            className="form-control"
            type="text"
            name="nome"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            placeholder="Insira seu nome completo..."
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="email">
            E-mail
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira o seu e-mail de contato"
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="redesSociais">
            Linkedin
          </label>
          <input
            className="form-control"
            type="text"
            name="redesSociais"
            id="redesSociais"
            onChange={(e) => setRedesSociais(e.target.value)}
            placeholder="Insira a URL do seu Linkedin..."
          />
          <small className="dica">
            *Opcional, ignore caso ainda não tenha um.
          </small>
        </div>
        <div className="col-lg-3 col-4">
          <label className="form-label" htmlFor="experiencia">
            Tem experiência?
          </label>
          <select
            className="form-select"
            name="experiencia"
            id="experiencia"
            onChange={(e) => setExperiencia(e.target.value)}
          >
            <option value="">Selecione a opção...</option>
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="conhecimentos">
            Seus Conhecimentos
          </label>
          <input
            className="form-control"
            type="text"
            name="conhecimentos"
            id="conhecimentos"
            onChange={(e) => setConhecimentos(e.target.value)}
            placeholder="Insira seus conhecimentos: ex: HTML, CSS, Javascript...."
          />
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="descricao">
            Descrição-se
          </label>
          <textarea
            className="form-control"
            name="descricao"
            id="descricao"
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Insira uma breve descricao sobre você."
          ></textarea>
        </div>
        <div className="col-lg-6 col-12">
          <label className="form-label" htmlFor="image">
            Imagem de Perfil
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
        <div className="row g-3">
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="senha">
              Senha
            </label>
            <input
              className="form-control"
              type="password"
              name="senha"
              id="senha"
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Insira uma senha de acesso..."
            />
            <small className="dica">
              *A senha deve ter pelo menos um caractere especial, uma letra e um
              número.
            </small>
          </div>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="confirmaSenha">
              Confirmação de Senha
            </label>
            <input
              className="form-control"
              type="password"
              name="confirmaSenha"
              id="confirmaSenha"
              onChange={(e) => setConfirmaSenha(e.target.value)}
              placeholder="Confirme a senha de acesso..."
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
        <Link to="/logintalento">
          <span>Cliqui aqui!</span>
        </Link>
      </p>
    </form>
  );
};

export default CadastraTalento;
