import { ChevronsUpDown, Trash } from "lucide-react";
import { NavBar } from "../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { novaPessoa, listarPessoas, deletarPessoa } from "../../api/pessoas";
import type { Pessoa } from "../../types/Pessoa";
import { Table, TableHeader, TableRow, TableCell } from "../../components/Table";

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

  async function handleExcluir(id: string) {
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
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold dark:text-white">
            Pessoas
          </p>
          <p className="text-base text-neutral-500">
            Gerencie as pessoas cadastradas
          </p>
        </div>
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
              <div className="flex flex-col gap-4">
                <p className="text-base font-bold dark:text-white">
                  Nome <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome completo"
                  className="
                    w-full p-4
                    placeholder:text-black dark:placeholder:text-neutral-500
                    border border-neutral-400 rounded-xl outline-0
                  "
                />
              </div>
              <div className="flex flex-col gap-4 relative">
                <p className="text-base font-bold dark:text-white">
                  Idade <span className="text-red-500">*</span>
                </p>
                <select
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="
                    w-full p-4
                    border border-neutral-400 rounded-xl outline-0
                    text-black dark:text-neutral-500
                    appearance-none outline-none cursor-pointer
                  "
                >
                  <option value="" disabled>Selecione a idade</option>

                  {Array.from({ length: 120}, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                  <ChevronsUpDown
                    size={20}
                    className="
                      absolute
                      right-4 top-15
                      text-neutral-500
                    "
                  />
              </div>
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
                    onClick={() => handleExcluir(pessoa.id)}
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
