import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import bancoTalentosFetch from "../axios/config";

import "./PerfilTalento.css";

const PerfilTalento = () => {
  const params = useParams();

  const [perfilTalento, setPerfilTalento] = useState([]);

  const [ativo, setAtivo] = useState(false);

  const getPerfilTalento = async () => {
    await bancoTalentosFetch
      .get(`/detalhestalento/${params.id}`)
      .then((res) => {
        setPerfilTalento(res.data);
      });
  };

  //EDITAR PERFIL TALENTO

  const editaPerfilTalento = () => {
    setAtivo(true);
  };

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [redesSociais, setRedesSociais] = useState("");
  const [conhecimentos, setConhecimentos] = useState("");
  const [descricao, setDescricao] = useState("");
  const [image, setImage] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");

  const onFileChange = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const talento = {
      nome,
      email,
      redesSociais,
      conhecimentos,
      descricao,
      image: image,
      senha,
      confirmaSenha,
    };

    const formData = new FormData();

    Object.keys(talento).forEach((key) => {
      formData.append(key, talento[key]);
    });

    await bancoTalentosFetch
      .patch(`/editatalento/${params.id}`, formData)
      .then((res) => {
        useToast(res.data.message);
        setAtivo(false);
        getPerfilTalento();
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  useEffect(() => {
    getPerfilTalento();
  }, []);

  return (
    <div className="container-informações">
      <div className="row">
        <h1 className="text-center py-3">{perfilTalento.nome}</h1>
        <div className="col-6">
          <img src={perfilTalento.image} alt={perfilTalento.nome} />
        </div>
        <div className="col-6">
          <p className="fw-bold">
            E-mail: <span className="fw-normal">{perfilTalento.email}</span>
          </p>
          <p className="fw-bold">
            Tem Linkedin:{" "}
            <span className="fw-normal">
              {perfilTalento.redesSociais ? (
                <span>{perfilTalento.redesSociais}</span>
              ) : (
                <span>Não</span>
              )}
            </span>
          </p>
          <p className="fw-bold">
            Conhecimentos:{" "}
            <span className="fw-normal">{perfilTalento.conhecimentos}</span>
          </p>
          <p className="fw-bold">
            Tem experiências:{" "}
            <span className="fw-normal">
              {perfilTalento.experiencias ? (
                <span>{perfilTalento.experiencias}</span>
              ) : (
                <span>Não</span>
              )}
            </span>
          </p>
          <input
            className="btn-geral"
            type="submit"
            value="Editar Perfil"
            onClick={editaPerfilTalento}
          />
        </div>
        {ativo ? (
          <form onSubmit={handleSubmit}>
            <h1 className="text-center py-3">Atualize seu Cadastro!</h1>
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
                  value={nome || perfilTalento.nome}
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
                  value={email || perfilTalento.email}
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
                  value={redesSociais || perfilTalento.redesSociais}
                  placeholder="Insira a URL do seu Linkedin..."
                />
                <small className="dica">
                  *Opcional, ignore caso ainda não tenha um.
                </small>
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
                  value={conhecimentos || perfilTalento.conhecimentos}
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
                  value={descricao || perfilTalento.descricao}
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
                    *A senha deve ter pelo menos um caractere especial, uma
                    letra e um número.
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
              value="Atualizar cadastro"
            />
          </form>
        ) : (
          <>
            <h2 className="text-center py-3">Descrição</h2>
            <p>{perfilTalento.descricao}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PerfilTalento;
