import axios from "axios";

let empresa = JSON.parse(localStorage.getItem("empresa"));

let talento = JSON.parse(localStorage.getItem("talento"));

let token;

if (empresa) {
  token = empresa.token;
} else if (talento) {
  token = talento.token;
}

const BancoTalentosFetch = axios.create({
  baseURL:
    "https://c8667a7d-2a32-4b3d-aed8-5f2c9c5209be-00-1mom1de4fc4le.spock.replit.dev",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

export default BancoTalentosFetch;
