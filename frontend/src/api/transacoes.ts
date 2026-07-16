import { api } from "./api";
import type { Transacao } from "../types/Tranasacao";

export async function listarTransacoes() {
  const { data } = await api.get<Transacao[]>("/transacoes")

  return data
}

interface NovaTransacaoRequest {
  descricao: string;
  valor: number;
  tipo: number;
  pessoaId: string;
}

export async function novaTransacao(request: NovaTransacaoRequest) {
  const { data } = await api.post<Transacao>("/transacoes", request)

  return data
}
