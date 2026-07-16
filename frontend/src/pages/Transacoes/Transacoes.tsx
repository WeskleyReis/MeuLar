import { Input } from "../../components/Input/Input";
import { NavBar } from "../../components/NavBar/NavBar";
import { Select } from "../../components/Select/Select";
import { Title } from "../../components/Tittle/Title";
import { Table, TableHeader, TableRow, TableCell } from "../../components/Table";
import { useEffect, useState } from "react";
import { listarTransacoes, novaTransacao } from "../../api/transacoes";
import { listarPessoas } from "../../api/pessoas";
import type { Pessoa } from "../../types/Pessoa";
import type { Transacao } from "../../types/Transacao";
import { Badge } from "../../components/Badge/Badge";

export function Transacoes() {
  const [ pessoas, setPessoas ] = useState<Pessoa[]>([])
  const [ transacoes, setTransacoes ] = useState<Transacao[]>([])
  const [ descricao, setDescricao ] = useState("")
  const [ valor, setValor ] = useState("")
  const [ tipo, setTipo ] = useState("")
  const [ pessoaId, setPessoaId ] = useState("")

  const pessoaSelecionada = pessoas.find(
    (pessoa) => pessoa.id === pessoaId
  )

  async function carregarPessoa() {
    try {
      const data = await listarPessoas()
      console.log(data)

      setPessoas(data)
    } catch (error) {
      console.log("Erro ao buscar pessoas:", error)
    }
  }

  async function carregarTransacoes() {
    try {
      const data = await listarTransacoes()
      console.log(data)

      setTransacoes(data)
    } catch (error) {
      console.error("Erro ao buscar transações:", error)
    }
  }

  async function handleCadastrar() {
    if (!descricao || !valor || !tipo || !pessoaId) {
      alert("Preencha todos os campos.")
      return
    }

    try {
      await novaTransacao({
        descricao,
        valor: Number(valor),
        tipo: Number(tipo),
        pessoaId
      })

      setDescricao("")
      setValor("")
      setTipo("")
      setPessoaId("")

      await carregarTransacoes()

    } catch (error) {
      console.error("Error ao cadastrar transação:", error)
    }
  }

  useEffect(() => {
    async function carregar() {
      await Promise.all([
        carregarPessoa(),
        carregarTransacoes()
      ])
    }

    carregar()
  }, [])

  return (
    <main
      className="
        min-h-screen flex
        dark:bg-neutral-950
      "
    >
      <NavBar />
      <section className="w-full p-12 flex flex-col gap-12">
        <Title title="Transações" desc="Liste as transações cadastradas" />

        <div className="flex gap-6">
          <div
            className="
              p-6 border border-neutral-400 rounded-xl
              dark:bg-neutral-800
              flex flex-col gap-12
            "
          >
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold dark:text-white">Nova Transação</p>
                <p className="text-base text-neutral-500">
                  Preencha os dados para cadastrara uma nova transação
                </p>
              </div>
            <div className="flex flex-col gap-4">
              <Select
                label="Pessoa"
                required
                value={pessoaId}
                onChange={(e) => setPessoaId(e.target.value)}
              >
                <option value="" disabled>
                  Selecione uma pessoa
                </option>

                {pessoas.map((pessoa) => (
                  <option
                    key={pessoa.id}
                    value={pessoa.id}
                  >
                    {pessoa.nome}
                  </option>
                ))}
              </Select>

              {pessoaSelecionada && pessoaSelecionada.idade < 18 && (
                <span
                  className="
                    p-2 rounded-xl
                    bg-orange-200
                    border border-orange-400
                    text-orange-700 text-xs
                    text-center
                  "
                >
                  Esta pessoa é menor de idade e pode cadastrar apenas despesa.
                </span>
              )}

              <Input
                label="Descrição"
                required
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Salário, Aluguel..."
                type="text"
              />

              <Select
                label="Tipo"
                required
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="" disabled>
                  Selecione o tipo
                </option>

                <option value="0">Despesa</option>
                <option value="1">Receita</option>
              </Select>

              <Input
                label="Valor"
                required
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="0.00"
                type="number"
              />
            </div>
            <button
              onClick={handleCadastrar}
              className="
                bg-indigo-700 p-4 rounded-xl
                text-base font-bold text-white
              "
            >
              Cadastrar
            </button>
          </div>

          <Table>
            <TableHeader
              template="2fr 2fr 1fr 1fr"
              columns={[
                "Pessoas",
                "Descrição",
                "Tipo",
                "Valor"
              ]}
            />

            {transacoes.map((transacao) => (
              <TableRow
                key={transacao.id}
                template="2fr 2fr 1fr 1fr"
              >
                <TableCell>
                  {transacao.nomePessoa}
                </TableCell>

                <TableCell>
                  {transacao.descricao}
                </TableCell>

                <TableCell>
                  <Badge tipo={transacao.tipo} />
                </TableCell>

                <TableCell>
                  R$ {transacao.valor.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </section>
    </main>
  )
}
