import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import bancoTalentosFetch from "../axios/config";

import "./TodosTalentos.css";

const TodosTalentos = () => {
  const [talentos, setTalentos] = useState([]);

  const getTodosTalentos = async () => {
    await bancoTalentosFetch
      .get("/todostalentos")
      .then((res) => {
        setTalentos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // PAGINAÇÃO

  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

  const lastIndex = currentPage * recordsPerPage;

  const fistIndex = lastIndex - recordsPerPage;

  const records = talentos.slice(fistIndex, lastIndex);

  const npage = Math.ceil(talentos.length / recordsPerPage);

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

  const [talentoSearch, setTalentoSearch] = useState([]);

  const [search, setSearch] = useState("");

  const getTodosTalentosFiltrado = async () => {
    await bancoTalentosFetch.get(`/todostalentos?q=${search}`).then((res) => {
      setTalentoSearch(res.data);
    });
  };

  const filterTalento = talentoSearch.filter((item) => {
    return item.conhecimentos.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearch = async (e) => {
    e.preventDefault();

    getTodosTalentosFiltrado();

    setTalentos(filterTalento);
  };

  const handleClear = async () => {
    getTodosTalentos();

    //ZERAR O CAMPO DE BUSCA
    setSearch("");
  };

  //SISTEMA DE BUSCA

  useEffect(() => {
    getTodosTalentos();

    getTodosTalentosFiltrado();
  }, []);

  return (
    <>
      <h1 className="text-center py-3">Todos os Talentos</h1>
      <div className="row g-3">
        <div className="row w-75 m-auto py-3 mb-5">
          <form className="input-group" onSubmit={handleSearch}>
            <div className="col-lg-8 col-8">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar por talento com conhecimentos específicos..."
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
        {talentos.length == 0 && (
          <p className="text-center fs-3 mb-5">Nada encontrado: {search}</p>
        )}
        {talentos.length != 0 && (
          <>
            {records.map((talento) => (
              <div className="col-12" key={talento.idTalento}>
                <hr />
                <p className="fw-bold">
                  Nome: <span className="fw-normal">{talento.nome}</span>
                </p>
                <p className="fw-bold">
                  Conhecimentos:{" "}
                  <span className="fw-normal">{talento.conhecimentos}</span>
                </p>
                <p className="fw-bold">
                  Tem experiências:{" "}
                  <span className="fw-normal">
                    {talento.experiencia ? <span>Sim</span> : <span>Não</span>}
                  </span>
                </p>
                <Link
                  className="btn-geral"
                  to={`/detalhestalento/${talento.idTalento}`}
                >
                  + Detalhes
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
      {talentos.length != 0 && (
        <nav className="mt-5">
          <hr />
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
      )}
    </>
  );
};

export default TodosTalentos;
