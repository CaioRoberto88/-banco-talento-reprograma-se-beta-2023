import React, { useState, useEffect } from "react";

import bancoTalentosFetch from "../axios/config";

import { useParams } from "react-router-dom";

import "./DetalhesTalento.css";

const DetalhesTalento = () => {
  const params = useParams();

  const [talento, setTalento] = useState([]);

  const getDetalhesTalento = async () => {
    await bancoTalentosFetch
      .get(`/detalhestalento/${params.id}`)
      .then((res) => {
        setTalento(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetalhesTalento();
  }, []);

  return (
    <div className="container-informações">
      <div className="row">
        <h1 className="text-center py-3">{talento.nome}</h1>
        <div className="col-6">
          <img src={talento.image} alt={talento.nome} />
        </div>
        <div className="col-6">
          <p className="fw-bold">
            E-mail: <span className="fw-normal">{talento.email}</span>
          </p>
          <p className="fw-bold">
            Tem Linkedin:{" "}
            <span className="fw-normal">
              {talento.redesSociais ? (
                <span>{talento.redesSociais}</span>
              ) : (
                <span>Não</span>
              )}
            </span>
          </p>
          <p className="fw-bold">
            Conhecimentos:{" "}
            <span className="fw-normal">{talento.conhecimentos}</span>
          </p>
          <p className="fw-bold">
            Tem experiência{" "}
            <span className="fw-normal">
              {talento.experiencia ? <span>Sim</span> : <span>Não</span>}
            </span>
          </p>
        </div>
        <h2 className="text-center py-3">Descrição</h2>
        <p>{talento.descricao}</p>
      </div>
    </div>
  );
};

export default DetalhesTalento;
