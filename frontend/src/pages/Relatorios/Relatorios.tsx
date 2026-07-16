import { NavBar } from "../../components/NavBar/NavBar"
import { Title } from "../../components/Tittle/Title"

export function Relatorios() {
  return (
    <main className="min-h-screen flex">
      <NavBar />
      <section className="w-full p-12 flex flex-col gap-12">
        <Title title="Consulta de Totais" desc="Resumo financeiro por pessoa" />
      </section>
    </main>
  )
}
