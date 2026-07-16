import { api } from "./api";

export async function relatorio() {
  const { data } = await api.get("/relatorios")

  return data
}
