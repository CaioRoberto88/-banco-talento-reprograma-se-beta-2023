import React, { useState, useEffect } from "react";

//CONEXÕES COM SERVIDOR
import bancoTalentosFetch from "../axios/config";

import bancoTalentosFetchJSON from "../axios/config-json";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import { Link, useParams, useNavigate } from "react-router-dom";

import "./PainelEmpresa.css";

const PainelEmpresa = () => {

  const navigate = useNavigate();

  const params = useParams();

  const [empresa, setEmpresa] = useState([]);

  const [opcao, setOpcao] = useState([]);

  const [oportunidades, setOportunidades] = useState([]);

  //USE STATE EDITA EMPRESA
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [tipoEmpresa, setTipoEmpresa] = useState("");
  const [descricaoEmpresa, setDescricaoEmpresa] = useState("");
  const [emailEmpresa, setEmailEmpresa] = useState("");
  const [senhaEmpresa, setSenhaEmpresa] = useState("");
  const [confirmaSenhaEmpresa, setConfirmaSenhaEmpresa] = useState("");
  const [image, setImage] = useState("");

  //USE STATE CRIA OPORTUNIDADE
  const [nomeOportunidade, setNomeOportunidade] = useState("");
  const [conhecimentosOportunidade, setConhecimentosOportunidade] = useState("");
  const [experienciasOportunidade, setExperienciasOportunidade] = useState("");
  const [detalhesOportunidade, setDetalhesOportunidade] = useState("");

  //OPÇÕES
  let valorPadrao = ["valorpadrao"];

  let criaOportunidade = ["criaoportunidade"];

  let oportunidade = ["oportunidade"];

  let edita = ["edita"];

  //PEGA A EMPRESA PELO ID
  const getEmpresa = async () => {
    await bancoTalentosFetch
      .get(`/empresa/${params.id}`)
      .then((res) => {
        setEmpresa(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFileChange = async (e) => {
    setImage(e.target.files[0]);
  };

  //EDITA EMPRESA
  const handleEditaEmpresa = async (e) => {
    e.preventDefault();

    const empresa = {
      nomeEmpresa,
      tipoEmpresa,
      descricaoEmpresa,
      emailEmpresa,
      image,
      senhaEmpresa,
      confirmaSenhaEmpresa,
    };

    const formData = new FormData();

    Object.keys(empresa).forEach((key) => {
      formData.append(key, empresa[key]);
    });

    await bancoTalentosFetch
      .patch(`/editaempresa/${params.id}`, formData)
      .then((res) => {
        useToast(res.data.message);
        getEmpresa();
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  //CADASTRA OPORTUNIDADE
  const handleCadastraOportunidade = async (e) => {
    e.preventDefault();

    let oportunidade = {
      nomeOportunidade,
      conhecimentosOportunidade,
      experienciasOportunidade,
      detalhesOportunidade,
    };

    await bancoTalentosFetchJSON
      .post("/cadastrooportunidade", oportunidade)
      .then((res) => {
        useToast(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  //RESGATA MINHAS OPORTUNIDADES
  const getMinhasOportunidades = async () => {
    await bancoTalentosFetch
      .get(`/minhasoportunidades/${params.id}`)
      .then((res) => {
        setOportunidades(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //DELETA OPORTUNIDADES
  const handleDeleteOportunidade = async (id) => {
    await bancoTalentosFetch
      .delete(`/deletaoportunidade/${id}`)
      .then((res) => {
        useToast(res.data.message);
        getMinhasOportunidades();
      })
      .catch((err) => {
        useToast(err.response.data.message, "error");
      });
  };

  useEffect(() => {
    getEmpresa();
    getMinhasOportunidades();
  }, []);

  return (
    <>
      <div className="container-informações">
        <div className="row g-3">
          <h1 className="text-center py-3">{empresa.nomeEmpresa}</h1>
          <div className="col-6">
            <img src={empresa.image} alt={empresa.nomeEmpresa} />
          </div>
          <div className="col-6">
            <p className="fw-bold">
              E-mail: <span className="fw-normal">{empresa.emailEmpresa}</span>
            </p>
            <p className="fw-bold">
              Tipo empresa:{" "}
              <span className="fw-normal">{empresa.tipoEmpresa}</span>
            </p>
          </div>
          <div className="col-lg-3 col-4">
            <label className="form-label" htmlFor="opcao">
              Selecione opções:
            </label>
            <select
              className="form-select"
              name="opcao"
              id="opcao"
              onChange={(e) => setOpcao(e.target.value)}
            >
              <option value={valorPadrao}>Selecione as opções...</option>
              <option value={criaOportunidade}>Criar Oportunidade</option>
              <option value={oportunidade}>Minhas Oportunidades</option>
              <option value={edita}>Editar Empresa</option>
            </select>
          </div>
          {opcao == ["valorpadrao"] && (
            <>
              <h2 className="text-center py-3">Descrição</h2>
              <p>{empresa.descricaoEmpresa}</p>
            </>
          )}
          {opcao == ["criaoportunidade"] && (
            <>
              <form onSubmit={handleCadastraOportunidade}>
                <div className="row g-3">
                  <h1 className="text-center py-3">Cadastrar Oportunidade</h1>
                  <div className="col-lg-6 col-12">
                    <label className="form-label" htmlFor="nomeOportunidade">
                      Nome da Oportunidade
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="nomeOportunidade"
                      id="nomeOportunidade"
                      onChange={(e) => setNomeOportunidade(e.target.value)}
                      placeholder="Insira o nome da oportunidade..."
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <label
                      className="form-label"
                      htmlFor="conhecimentosOportunidade"
                    >
                      Conhecimentos para Oportunidade
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="conhecimentosOportunidade"
                      id="conhecimentosOportunidade"
                      onChange={(e) =>
                        setConhecimentosOportunidade(e.target.value)
                      }
                      placeholder="Insira os conhecimentos para a oportunidade..."
                    />
                  </div>
                  <div className="col-lg-3 col-4">
                    <label
                      className="form-label"
                      htmlFor="experienciasOportunidade"
                    >
                      Necessita de experiência?
                    </label>
                    <select
                      className="form-select"
                      name=""
                      id=""
                      onChange={(e) =>
                        setExperienciasOportunidade(e.target.value)
                      }
                    >
                      <option value="">Selecione...</option>
                      <option value="1">Sim</option>
                      <option value="0">Não</option>
                    </select>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <label
                        className="form-label"
                        htmlFor="detalhesOportunidade"
                      >
                        Detalhes da Oportunidade
                      </label>
                      <textarea
                        className="form-control"
                        name="detalhesOportunidade"
                        id="detalhesOportunidade"
                        onChange={(e) =>
                          setDetalhesOportunidade(e.target.value)
                        }
                        placeholder="Insira detalhes para a oportunidade..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                <input
                  className="btn-geral my-3"
                  type="submit"
                  value="Cadastrar Oportunidade"
                />
              </form>
            </>
          )}
          {opcao == ["oportunidade"] && (
            <>
              {oportunidades.length == 0 && (
                <h5 className="text-center py-3">
                  Não possui oportunidades cadastrada!
                </h5>
              )}
              {oportunidades.map((oportunidade) => (
                <div className="row g-3" key={oportunidade.id}>
                  <div className="col-12">
                    <p>{oportunidade.nomeOportunidade}</p>
                    <Link
                      className="btn-geral"
                      to={`/oportunidadedetalhes/${oportunidade.id}`}
                    >
                      Detalhes
                    </Link>
                    <Link
                      className="btn-geral mx-3"
                      to={`/editaoportunidade/${oportunidade.id}`}
                    >
                      Editar
                    </Link>
                    <input
                      className="btn-deletar"
                      type="button"
                      value="Deletar"
                      onClick={() => handleDeleteOportunidade(oportunidade.id)}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
          {opcao == ["edita"] && (
            <form onSubmit={handleEditaEmpresa}>
              <h1 className="text-center py-3">Atualize seu Cadastro!</h1>
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
                    value={nomeEmpresa || empresa.nomeEmpresa}
                    placeholder="Insira seu nome completo..."
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="tipoEmpresa">
                    Tipo Empresa
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="tipoEmpresa"
                    id="tipoEmpresa"
                    onChange={(e) => setTipoEmpresa(e.target.value)}
                    value={tipoEmpresa || empresa.tipoEmpresa}
                    placeholder="Insira o seu e-mail de contato"
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="descricaoEmpresa">
                    Descrição
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="descricaoEmpresa"
                    id="descricaoEmpresa"
                    onChange={(e) => setDescricaoEmpresa(e.target.value)}
                    value={descricaoEmpresa || empresa.descricaoEmpresa}
                    placeholder="Insira a URL do seu Linkedin..."
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="emailEmpresa">
                    E-mail
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="emailEmpresa"
                    id="emailEmpresa"
                    onChange={(e) => setEmailEmpresa(e.target.value)}
                    value={emailEmpresa || empresa.emailEmpresa}
                    placeholder="Insira seus conhecimentos: ex: HTML, CSS, Javascript...."
                  />
                </div>
                <div className="col-lg-6 col-12">
                  <label className="form-label" htmlFor="image">
                    Imagem Empresa
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
                    <label className="form-label" htmlFor="senhaEmpresa">
                      Senha
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="senhaEmpresa"
                      id="senhaEmpresa"
                      onChange={(e) => setSenhaEmpresa(e.target.value)}
                      placeholder="Insira uma senha de acesso..."
                    />
                    <small className="dica">
                      *A senha deve ter pelo menos um caractere especial, uma
                      letra e um número.
                    </small>
                  </div>
                  <div className="col-lg-6 col-12">
                    <label
                      className="form-label"
                      htmlFor="confirmaSenhaEmpresa"
                    >
                      Confirmação de Senha
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmaSenhaEmpresa"
                      id="confirmaSenhaEmpresa"
                      onChange={(e) => setConfirmaSenhaEmpresa(e.target.value)}
                      placeholder="Confirme a senha de acesso..."
                    />
                  </div>
                </div>
              </div>
              <input
                className="btn-geral my-5"
                type="submit"
                value="Atualizar cadastro"
              />
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default PainelEmpresa;
