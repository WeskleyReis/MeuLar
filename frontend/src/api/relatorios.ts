import { api } from "./api";
import type { Relatorio } from "../types/Relatorio";

export async function consultarRelatorio() {
  const { data } = await api.get<Relatorio>("/relatorios")

  return data
}
