import React, { useState, useEffect } from "react";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetchJSON from "../axios/config-json";

import { useParams } from "react-router-dom";

import "./OportunidadeDetalhes.css";

const OportunidadeDetalhes = () => {
  const [oportunidade, setOportunidade] = useState([]);

  let params = useParams();

  const getOportunidadeDetalhes = async () => {
    await bancoTalentosFetchJSON
      .get(`/oportunidade/${params.id}`)
      .then((res) => {
        setOportunidade(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOportunidadeDetalhes();
  }, []);

  return (
    <>
      <div className="row">
        <h1 className="text-center py-3">{oportunidade.nomeOportunidade}</h1>
        <div className="col-6">
          <p className="conhecimentos-oportunidade-detalhes">
            Conhecimentos:
            <span className="fw-normal">
              {" "}
              {oportunidade.conhecimentosOportunidade}
            </span>
          </p>
          <p className="experiencias-oportunidade-detalhes">
            Requer experiência?
            {oportunidade.experienciasOportunidade ? (
              <span className="fw-normal"> Sim</span>
            ) : (
              <span className="fw-normal"> Não</span>
            )}
          </p>
          <p className="situacao-oportunidade-detalhes">
            Situação:
            {oportunidade.situacaoOportunidade ? (
              <span className="text-danger fw-bold"> Já foi Preenchida</span>
            ) : (
              <>
                <span className="text-success fw-bold"> Em Aberto</span>
              </>
            )}
          </p>
        </div>
        <div className="col-6">
          <img
            className="oportunidade-image-empresa offset-3"
            src={oportunidade.image}
            alt={oportunidade.nomeEmpresa}
          />
        </div>
      </div>
      <h2 className="text-center pt-5">Detalhes para a oportunidade</h2>
      <p>{oportunidade.detalhesOportunidade}</p>
    </>
  );
};

export default OportunidadeDetalhes;
