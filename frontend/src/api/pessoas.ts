import { api } from "./api";

export async function novaPessoa(nome: string, idade: number) {
  const { data } = await api.post("/pessoas", {
    nome,
    idade,
  })

  return data;
}

export async function listarPessoas() {
  const { data } = await api.get("/pessoas")

  return data
}

export async function deletarPessoa(id:string) {
  await api.delete(`/pessoas/${id}`)
}
