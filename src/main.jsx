import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//PAGINAS OPORTUNIDADES
import Home from "./routes/Home.jsx";
import OportunidadeDetalhes from "./routes/OportunidadeDetalhes.jsx";
import EditaOportunidade from "./routes/EditaOportunidade.jsx";

//PÁGINA EMPRESA
import CadastraEmpresa from "./routes/CadastraEmpresa.jsx";
import LoginEmpresa from "./routes/LoginEmpresa.jsx";
import PainelEmpresa from "./routes/PainelEmpresa.jsx";


//PAGINA TALENTOS
import CadastraTalento from "./routes/CadastraTalento.jsx";
import LoginTalento from "./routes/LoginTalento.jsx";
import TodosTalentos from "./routes/TodosTalentos.jsx";
import DetalhesTalento from "./routes/DetalhesTalento.jsx";
import PerfilTalento from "./routes/PerfilTalento.jsx";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cadastraempresa",
        element: <CadastraEmpresa />,
      },
      {
        path: "/loginempresa",
        element: <LoginEmpresa />,
      },
      {
        path: "/painelempresa/:id",
        element: <PainelEmpresa />,
      },
      {
        path: "/oportunidadedetalhes/:id",
        element: <OportunidadeDetalhes />,
      },
      {
        path: "/editaoportunidade/:id",
        element: <EditaOportunidade />,
      },
      {
        path: "/todostalentos",
        element: <TodosTalentos />,
      },
      {
        path: "/detalhestalento/:id",
        element: <DetalhesTalento />,
      },
      {
        path: "/cadastratalento",
        element: <CadastraTalento />,
      },
      {
        path: "/logintalento",
        element: <LoginTalento />,
      },
      {
        path: "/perfiltalento/:id",
        element: <PerfilTalento />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
