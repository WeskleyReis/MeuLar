import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Pessoas } from "../pages/Pessoas/Pessoas";
import { Transacoes } from "../pages/Transacoes";
import { Relatorios } from "../pages/Relatorios";

export function AppRouts() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  )
}
