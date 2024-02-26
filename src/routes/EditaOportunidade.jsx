import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetchJSON from "../axios/config-json";

//HOOKS TOASTIFY
import useToast from "../hook/useToastify";

import "./EditaOportunidade.css";

const CadastraOportunidade = () => {
  const navigate = useNavigate();

  const params = useParams();

  const [oportunidade, setOportunidade] = useState([]);

  const [nomeOportunidade, setNomeOportunidade] = useState("");
  const [conhecimentosOportunidade, setConhecimentosOportunidade] = useState("");
  const [experienciasOportunidade, setExperienciasOportunidade] = useState("");
  const [situacaoOportunidade, setSituacaoOportunidade] = useState("");
  const [detalhesOportunidade, setDetalhesOportunidade] = useState("");

  const getOportunidade = async () => {
    await bancoTalentosFetchJSON
      .get(`/oportunidade/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setOportunidade(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditaOportunidade = async (e) => {
    e.preventDefault();

    let oportunidade = {
      nomeOportunidade,
      conhecimentosOportunidade,
      experienciasOportunidade,
      situacaoOportunidade,
      detalhesOportunidade,
    };

    console.log(oportunidade);

    await bancoTalentosFetchJSON
      .patch(`/editaoportunidade/${params.id}`, oportunidade)
      .then((res) => {
        useToast(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        useToast(err.response.data.message);
      });
  };

  useEffect(() => {
    getOportunidade();
  }, []);

  return (
    <>
      <form onSubmit={handleEditaOportunidade}>
        <div className="row g-3">
          <h1 className="text-center py-3">Edita Oportunidade</h1>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="nomeOportunidade">
              Nome da Oportunidade
            </label>
            <input
              className="form-control"
              type="text"
              name="nomeOportunidade"
              id="nomeOportunidade"
              value={nomeOportunidade || oportunidade.nomeOportunidade || ""}
              onChange={(e) => setNomeOportunidade(e.target.value)}
              placeholder="Insira o nome da oportunidade..."
            />
          </div>
          <div className="col-lg-6 col-12">
            <label className="form-label" htmlFor="conhecimentosOportunidade">
              Conhecimentos para Oportunidade
            </label>
            <input
              className="form-control"
              type="text"
              name="conhecimentosOportunidade"
              id="conhecimentosOportunidade"
              value={
                conhecimentosOportunidade ||
                oportunidade.conhecimentosOportunidade ||
                ""
              }
              onChange={(e) => setConhecimentosOportunidade(e.target.value)}
              placeholder="Insira os conhecimentos para a oportunidade..."
            />
          </div>
          <div className="col-lg-3 col-5">
            <label className="form-label" htmlFor="experienciasOportunidade">
              Necessita de experiência?
            </label>
            <select
              className="form-select"
              name="experienciasOportunidade"
              id="experienciasOportunidade"
              value={
                experienciasOportunidade ||
                oportunidade.experienciasOportunidade ||
                ""
              }
              onChange={(e) => setExperienciasOportunidade(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
          <div className="col-lg-3 col-5">
            <label className="form-label" htmlFor="situacaoOportunidade">
              Preencheu a vaga?
            </label>
            <select
              className="form-select"
              name="situacaoOportunidade"
              id="situacaoOportunidade"
              value={
                situacaoOportunidade || oportunidade.situacaoOportunidade || ""
              }
              onChange={(e) => setSituacaoOportunidade(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label" htmlFor="detalhesOportunidade">
                Detalhes da Oportunidade
              </label>
              <textarea
                className="form-control"
                name="detalhesOportunidade"
                id="detalhesOportunidade"
                value={
                  detalhesOportunidade ||
                  oportunidade.detalhesOportunidade ||
                  ""
                }
                onChange={(e) => setDetalhesOportunidade(e.target.value)}
                placeholder="Insira detalhes para a oportunidade..."
              ></textarea>
            </div>
          </div>
        </div>
        <input
          className="btn-geral my-3"
          type="submit"
          value="Atualizar Oportunidade"
        />
      </form>
    </>
  );
};

export default CadastraOportunidade;
