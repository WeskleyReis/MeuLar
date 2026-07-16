import { Trash } from "lucide-react";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { novaPessoa, listarPessoas, deletarPessoa } from "../../api/pessoas";
import type { Pessoa } from "../../types/Pessoa";
import { Table, TableHeader, TableRow, TableCell } from "../../components/Table";
import { Title } from "../../components/Tittle/Title";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";

export function Pessoas() {
  const [ pessoas, setPessoas ] = useState<Pessoa[]>([])
  const [ nome, setNome ] = useState("")
  const [ idade, setIdade ] = useState("")

  async function carregarPessoas() {
    try {
      const data = await listarPessoas()
      console.log(data)

      setPessoas(data)
    } catch (error) {
      console.error("Erro ao buscar pessoas:", error)
    }
  }

  async function handleCadastrar() {
    if (!nome.trim() || !idade) {
      alert("Preencha todos os campos.")
      return
    }

    try {
      await novaPessoa(nome, Number(idade))

      // Limpa o formulário
      setNome("")
      setIdade("")

      // Atualiza a lista
      await carregarPessoas()

    } catch (error) {
      console.error("Error ao cadastrar pessoa:", error)
    }
  }

  async function handleExcluir(id: string, nome: string) {
    const confirmar = confirm(`
      Tem certeza que deseja excluir ${nome}?
      Esta ação é permanente e não poderá ser desfeita.
      Ao excluir esta pessoa, todas as transações vinculadas a ela também serão excluídas.
    `)

    if (!confirmar) return

    try {
      await deletarPessoa(id)

      // Atualiza a lista
      await carregarPessoas()

    } catch (error) {
      console.error("Erro ao exluir pessoa", error)
    }
  }

  useEffect(() => {
    async function carregar() {
      await carregarPessoas()
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
        <Title title="Pessoas" desc="Gerencie as pessoas cadastradas" />
        <div className="flex gap-6">
          <div
            className="
              p-6 border border-neutral-400 rounded-xl
              dark:bg-neutral-800
              flex flex-col gap-12
            "
          >
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold dark:text-white">Nova Pessoa</p>
                <p className="text-base text-neutral-500">
                  Preencha os dados para cadastrara uma nova pessoa
                </p>
              </div>
            <div className="flex flex-col gap-4">
              <Input
                label="Nome"
                required
                placeholder="Digite o nome completo"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Select
                label="Idade"
                required
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              >
                <option value="" disabled>Selecione a idade</option>

                  {Array.from({ length: 120}, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
              </Select>
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
              template="2fr 1fr 1fr"
              columns={[
                "Nome",
                "Idade",
                ""
              ]}
            />
            {pessoas.map((pessoa) => (
              <TableRow
                key={pessoa.id}
                template="2fr 1fr 1fr"
              >
                <TableCell>
                  {pessoa.nome}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <span>{pessoa.idade}</span>
                    {pessoa.idade < 18 && (
                      <span
                        className="
                          text-[10px]
                          px-3 py-1
                          rounded-full
                          bg-orange-500
                          text-white
                          font-bold
                        "
                      >
                        MENOR DE IDADE
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="justify-self-end">
                  <button
                    onClick={() => handleExcluir(pessoa.id, pessoa.nome)}
                    className="
                      flex items-center
                      gap-2
                      cursor-pointer
                    "
                  >
                    <Trash size={14} />
                    <span className="font-bold">
                      Excluir
                    </span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </section>
    </main>
  )
}
