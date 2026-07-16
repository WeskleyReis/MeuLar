export interface PessoaResumo {
  id: string
  nome: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface Relatorio {
  pessoas: PessoaResumo[]
  totalPessoas: number
  totalReceitas: number
  totalDespesas: number
  saldo: number
}
