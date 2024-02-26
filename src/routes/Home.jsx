import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { format } from "date-fns";

import pt from "date-fns/esm/locale/pt";

import "./Home.css";

//CONEXÃO COM O SERVIDOR
import bancoTalentosFetch from "../axios/config";

const Home = () => {
  const [oportunidades, setOportunidades] = useState([]);

  const getTodasOportunidades = async () => {
    await bancoTalentosFetch.get("/todasoportunidades").then((res) => {
      setOportunidades(res.data);
    });
  };

  // PAGINAÇÃO

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

  const lastIndex = currentPage * recordsPerPage;

  const fistIndex = lastIndex - recordsPerPage;

  const records = oportunidades.slice(fistIndex, lastIndex);

  const npage = Math.ceil(oportunidades.length / recordsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(e) {
    e.preventDefault();
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  //SISTEMA DE BUSCA

  const [oportunidadesSearch, setOportunidadesSearch] = useState([]);

  const [search, setSearch] = useState("");

  const getTodasOportunidadesFiltrado = async () => {
    await bancoTalentosFetch
      .get(`/todasoportunidades?q=${search}`)
      .then((res) => {
        setOportunidadesSearch(res.data);
      });
  };

  const filterOportunidades = oportunidadesSearch.filter((item) => {
    return item.conhecimentosOportunidade
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    getTodasOportunidadesFiltrado();

    setOportunidades(filterOportunidades);
  };

  const handleClear = async () => {
    getTodasOportunidadesFiltrado();
    setSearch("");
  };

  //SISTEMA DE BUSCA

  useEffect(() => {
    getTodasOportunidades();

    getTodasOportunidadesFiltrado();
  }, []);

  return (
    <>
      <h1 className="text-center py-3">Oportunidades de vagas!</h1>
      <div className="row g-3">
        <div className="row w-75 m-auto py-3 mb-5">
          <form className="input-group" onSubmit={handleSearch}>
            <div className="col-lg-8 col-8">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar por oportunidades com seus conhecimentos"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-lg-4 col-4 btn-container">
              <input className="btn-buscar" type="submit" value="Buscar" />
              <input
                className="btn-limpar"
                type="submit"
                value="Limpar"
                onClick={handleClear}
              />
            </div>
          </form>
        </div>
        {oportunidades.length == 0 && (
          <p className="text-center fs-3 mb-5">Nada encontrado: {search}</p>
        )}
        {oportunidades.length != 0 && (
          <>
            {records.map((vaga) => (
              <div className="col-6 card p-5" key={vaga.id}>
                <small className="mb-3 data-Oportunidade">
                  Vaga postada em:{" "}
                  {format(
                    new Date(vaga.createdAt),
                    `EEEE - dd/MM/yyyy - HH:mm`,
                    {
                      locale: pt,
                    }
                  )}
                </small>
                <h5 className="titulo-oportunidade">{vaga.nomeOportunidade}</h5>
                <p className="conhecimentos-oportunidade">
                  Conhecimentos:{" "}
                  <span className="fw-normal">
                    {vaga.conhecimentosOportunidade}
                  </span>
                </p>
                <p className="experiencias-oportunidade">
                  Necessita de experiência?
                  {vaga.experienciasOportunidade ? (
                    <span className="fw-normal"> Sim</span>
                  ) : (
                    <span className="fw-normal"> Não</span>
                  )}
                </p>
                <p className="situacao-oportunidade">
                  Situação:
                  {vaga.situacaoOportunidade ? (
                    <span className="text-danger fw-bold">
                      {" "}
                      Vaga Preenchida
                    </span>
                  ) : (
                    <span className="text-success fw-bold"> Em Aberto</span>
                  )}
                </p>
                <Link
                  className="btn-geral col-lg-3 col-12"
                  to={`/oportunidadeDetalhes/${vaga.id}`}
                >
                  +Detalhes
                </Link>
              </div>
            ))}
          </>
        )}
        {oportunidades.length != 0 && (
          <>
            <nav className="">
              <ul className="page-bar">
                {currentPage == 1 ? (
                  <li className="page-item">
                    <Link className="page-link" to="#" onClick={prevPage}>
                      {""} Primeira página
                    </Link>
                  </li>
                ) : (
                  <li className="page-item">
                    <Link className="page-link" to="#" onClick={prevPage}>
                      {""} Página Anterior
                    </Link>
                  </li>
                )}
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${
                      currentPage === n ? "active-page" : ""
                    }`}
                    key={i}
                  >
                    <Link className="page-item" to="#" onClick={changeCPage}>
                      <span className="number-page">{n}</span>
                    </Link>
                  </li>
                ))}
                {currentPage == npage ? (
                  <li className="page-item">
                    <Link className="page-link" to="#" onClick={nextPage}>
                      {""} Última página
                    </Link>
                  </li>
                ) : (
                  <li className="page-item">
                    <Link className="page-link" to="#" onClick={nextPage}>
                      {""} Próxima página
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
