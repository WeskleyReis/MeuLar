import { TrendingUp, TrendingDown, Wallet, Users } from "lucide-react"
import { NavBar } from "../../components/NavBar/NavBar"
import { Title } from "../../components/Tittle/Title"
import { Card } from "../../components/Card/Card"
import { Table, TableHeader, TableRow, TableCell } from "../../components/Table";
import { useEffect, useState } from "react";
import { consultarRelatorio } from "../../api/relatorios";
import type { Relatorio } from "../../types/Relatorio";

export function Relatorios() {
  const [ relatorio, setRelatorio ] = useState<Relatorio | null>(null)

  async function carregarRelatorio() {
    try{
      const data = await consultarRelatorio()

      console.log(data)

      setRelatorio(data)

    } catch (error) {
      console.error("Error ao carregar relatório:", error)
    }
  }

  useEffect(() => {
    async function carregar() {
      await carregarRelatorio()
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
      <section className="w-full h-fit p-12 flex flex-col gap-12">
        <Title title="Consulta de Totais" desc="Resumo financeiro por pessoa" />
        <div className="flex justify-evenly">
          <Card
            title="Total de Receitas"
            subTitle={`R$ ${relatorio?.totalReceitas.toFixed(2) ?? "0.00"}`}
            bgColor="bg-green-600/20"
            borderColor="border-green-600"
            textColor="text-green-600"
            icon={TrendingUp}
          />

          <Card
            title="Total de Despesas"
            subTitle={`R$ ${relatorio?.totalDespesas.toFixed(2) ?? "0.00"}`}
            bgColor="bg-red-600/20"
            borderColor="border-red-600"
            textColor="text-red-600"
            icon={TrendingDown}
          />

          <Card
            title="Saldo Total"
            subTitle={`R$ ${relatorio?.saldo.toFixed(2) ?? "0.00"}`}
            bgColor="bg-sky-600/20"
            borderColor="border-blue-600"
            textColor="text-sky-600"
            icon={Wallet }
          />

          <Card
            title="Pessoas Cadastradas"
            subTitle={`R$ ${relatorio?.totalPessoas ?? "0"}`}
            bgColor="bg-purple-600/20"
            borderColor="border-purple-600"
            textColor="text-purple-600"
            icon={Users}
          />
        </div>
        <Table>
          <TableHeader
            template="2fr 1fr 1fr 1fr"
            columns={[
              "Pessoas",
              "Receitas",
              "Despesas",
              "Saldo"
            ]}
          />

          {relatorio?.pessoas.map((pessoa) => (
            <TableRow
              key={pessoa.id}
              template="2fr 1fr 1fr 1fr"
            >

              <TableCell>
                {pessoa.nome}
              </TableCell>

              <TableCell className="text-green-600">
                R$ {pessoa.totalReceitas.toFixed(2)}
              </TableCell>

              <TableCell className="text-red-500">
                R$ {pessoa.totalDespesas.toFixed(2)}
              </TableCell>

              <TableCell
                className={`font-semibold ${
                  pessoa.saldo > 0
                  ? "text-green-600"
                  : "text-red-500"

                }`}
              >
                R$ {pessoa.saldo.toFixed(2)}
              </TableCell>

            </TableRow>
          ))}
        </Table>
      </section>
    </main>
  )
}
